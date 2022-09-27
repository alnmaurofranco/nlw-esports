import { OAuthStrategy } from "../../../domain/strategy/oauth-strategy";
import { TwitchOAuthStrategyOutput } from "../../../infra/strategy/twitch-oauth-strategy-dto";
import {
  AuthenticateByTwitchInput,
  AuthenticateByTwitchOutput,
} from "./authenticate-by-twitch-dto";

export default class AuthenticateByTwitchUseCase {
  readonly #oauthStrategy: OAuthStrategy;

  constructor(oauthStrategy: OAuthStrategy) {
    this.#oauthStrategy = oauthStrategy;
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
    return {
      id: userData.id,
      login: userData.login,
      display_name: userData.display_name,
      description: userData.description,
      profile_image_url: userData.profile_image_url,
      view_count: userData.view_count,
      email: userData.email,
      created_at: userData.created_at,
    };
  }
}
