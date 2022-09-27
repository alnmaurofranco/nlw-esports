import { OAuthStrategy } from "../../../domain/strategy/oauth-strategy";
import { DiscordOAuthStrategyOutput } from "../../../infra/strategy/discord-oauth-strategy-dto";
import {
  AuthenticateByDiscordInput,
  AuthenticateByDiscordOutput,
} from "./authenticate-by-discord-dto";

export default class AuthenticateByDiscordUseCase {
  readonly #oauthStrategy: OAuthStrategy;

  constructor(oauthStrategy: OAuthStrategy) {
    this.#oauthStrategy = oauthStrategy;
  }

  async execute(
    input: AuthenticateByDiscordInput
  ): Promise<AuthenticateByDiscordOutput> {
    if (!input.code) {
      throw new Error("Missing code");
    }
    const accessToken = await this.#oauthStrategy.getAccessTokenByCode(
      input.code
    );
    if (!accessToken) {
      throw new Error("Missing access token");
    }
    const userData =
      await this.#oauthStrategy.getUserDataByAccessToken<DiscordOAuthStrategyOutput>(
        accessToken
      );
    if (!userData) {
      throw new Error("Missing user data");
    }
    return {
      username: userData.username,
      avatar: userData.avatar,
      email: userData.email,
    };
  }
}
