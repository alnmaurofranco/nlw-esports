import TokenManager from "../../../domain/manager/token-manager";
import { OAuthStrategy } from "../../../domain/strategy/oauth-strategy";
import { TwitchOAuthStrategyOutput } from "../../../infra/strategy/twitch-oauth-strategy-dto";
import {
  AuthenticateByTwitchInput,
  AuthenticateByTwitchOutput,
} from "./authenticate-by-twitch-dto";

export default class AuthenticateByTwitchUseCase {
  readonly #oauthStrategy: OAuthStrategy;
  readonly #tokenManager: TokenManager;

  constructor(oauthStrategy: OAuthStrategy, tokenManager: TokenManager) {
    this.#oauthStrategy = oauthStrategy;
    this.#tokenManager = tokenManager;
  }

  async execute(
    input: AuthenticateByTwitchInput
  ): Promise<AuthenticateByTwitchOutput> {
    if (!input.code) {
      throw new Error("code is required");
    }
    const accessToken = await this.#oauthStrategy.getAccessTokenByCode(
      input.code
    );
    if (!accessToken) {
      throw new Error("access token is required");
    }
    const userData =
      await this.#oauthStrategy.getUserDataByAccessToken<TwitchOAuthStrategyOutput>(
        accessToken
      );
    if (!userData) {
      throw new Error("error getting user data");
    }
    const token = this.#tokenManager.generate(
      {
        sub: userData.email,
        id: userData.id,
        login: userData.login,
        display_name: userData.display_name,
        description: userData.description,
        profile_image_url: userData.profile_image_url,
        view_count: userData.view_count,
        created_at: userData.created_at,
      },
      {
        audience: "type:access:token:twitchtv",
        expiresIn: "15m",
      }
    );
    return {
      access_token: token,
    };
  }
}
