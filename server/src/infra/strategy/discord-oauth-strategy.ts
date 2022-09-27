import { AxiosResponse } from "axios";
import { stringify } from "query-string";
import { OAuthStrategy } from "../../domain/strategy/oauth-strategy";
import HttpClient from "../adapter/http-client/http-client";
import BaseOAuthStrategy from "./base-oauth-strategy";
import {
  DiscordOAuthResponseToken,
  DiscordOAuthResponseUserData,
} from "./discord-oauth-strategy-dto";

export default class DiscordOAuthStrategy
  extends BaseOAuthStrategy
  implements OAuthStrategy
{
  readonly #httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    super({
      clientId: String(process.env.DISCORD_CLIENT_ID),
      clientSecret: String(process.env.DISCORD_CLIENT_SECRET),
      redirectUri: String(process.env.DISCORD_CALLBACK),
      grantType: "authorization_code",
    });
    this.#httpClient = httpClient;
  }

  async getAccessTokenByCode(code: string): Promise<string> {
    let responseDiscordToken: AxiosResponse<DiscordOAuthResponseToken>;
    const body = {
      code,
      client_id: this.clientId,
      client_secret: this.clientSecret,
      redirect_uri: this.redirectUri,
      grant_type: "authorization_code",
    };
    const options = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    try {
      responseDiscordToken = await this.#httpClient.post<
        AxiosResponse<DiscordOAuthResponseToken>
      >(
        `${process.env.DISCORD_BASE_URL}/oauth2/token`,
        stringify(body),
        options
      );
    } catch (error) {
      throw new Error("Authorization Discord is invalid.");
    }
    const { access_token } = responseDiscordToken.data;
    return access_token;
  }

  async getUserDataByAccessToken<DiscordOAuthStrategyOutput>(
    accessToken: string
  ): Promise<DiscordOAuthStrategyOutput> {
    let responseDiscordUserData: AxiosResponse<DiscordOAuthResponseUserData>;
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      responseDiscordUserData = await this.#httpClient.get<
        AxiosResponse<DiscordOAuthResponseUserData>
      >(`${process.env.DISCORD_BASE_URL}/users/@me`, options);
    } catch (error) {
      throw new Error("Get user data with provider Discord is invalid.");
    }
    return responseDiscordUserData.data as DiscordOAuthStrategyOutput;
  }
}
