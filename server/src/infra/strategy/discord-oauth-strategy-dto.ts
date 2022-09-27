export type DiscordOAuthResponseToken = {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
};

export type DiscordOAuthResponseUserData = {
  id: string;
  username: string;
  avatar: string;
  discriminator: string;
  public_flags: number;
  flags: number;
  locale: string;
  mfa_enabled: boolean;
  email: string;
  verified: boolean;
};

export type DiscordOAuthStrategyOutput = DiscordOAuthResponseUserData;
