export type AuthenticateByDiscordInput = {
  code: string;
};

export type AuthenticateByDiscordOutput = {
  username: string;
  avatar: string;
  email: string;
};
