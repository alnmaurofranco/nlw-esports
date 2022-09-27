export interface OAuthStrategy {
  getAccessTokenByCode(code: string): Promise<string>;
  getUserDataByAccessToken<T = unknown>(accessToken: string): Promise<T>;
}
