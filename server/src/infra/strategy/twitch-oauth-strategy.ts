import { AxiosResponse } from "axios";
import { stringify } from "query-string";
import { OAuthStrategy } from "../../domain/strategy/oauth-strategy";
import HttpClient from "../adapter/http-client/http-client";
import BaseOAuthStrategy from "./base-oauth-strategy";
import {
  TwitchOAuthResponseToken,
  TwitchOAuthResponseUserData,
} from "./twitch-oauth-strategy-dto";

export default class TwitchOAuthStrategy
  extends BaseOAuthStrategy
  implements OAuthStrategy
{
  readonly #httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    super({
      clientId: String(process.env.TWITCH_CLIENT_ID),
      clientSecret: String(process.env.TWITCH_CLIENT_SECRET),
      redirectUri: String(process.env.TWITCH_CALLBACK),
      grantType: "authorization_code",
    });
    this.#httpClient = httpClient;
  }

  async getAccessTokenByCode(code: string): Promise<string> {
    let responseTwitchToken: AxiosResponse<TwitchOAuthResponseToken>;
    const body = {
      code,
      client_id: this.clientId,
      client_secret: this.clientSecret,
      redirect_uri: this.redirectUri,
      grant_type: this.grantType,
    };
    try {
      responseTwitchToken = await this.#httpClient.post(
        `https://id.twitch.tv/oauth2/token?${stringify(body)}`
      );
    } catch (error) {
      throw new Error("Authorization TwitchTV is invalid.");
    }
    return responseTwitchToken.data.access_token;
  }

  async getUserDataByAccessToken<TwitchOAuthStrategyOutput>(
    accessToken: string
  ): Promise<TwitchOAuthStrategyOutput> {
    let responseTwitchUserData: AxiosResponse<TwitchOAuthResponseUserData>;
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Client-Id": this.clientId,
        Accept: "application/vnd.twitchtv.v5+json",
      },
    };
    try {
      responseTwitchUserData = await this.#httpClient.get(
        "https://api.twitch.tv/helix/users",
        options
      );
    } catch (error) {
      throw new Error("TwitchTV User data missign.");
    }
    return responseTwitchUserData.data.data.map(Object)[0];
  }
}
