export type TwitchOAuthResponseToken = {
  access_token: string;
  refresh_token: string;
};

export type TwitchOAuthResponseUserData = {
  data: {
    id: string;
    login: string;
    display_name: string;
    description: string;
    profile_image_url: string;
    view_count: number;
    email: string;
    type: string;
    broadcaster_type: string;
    offline_image_url: string;
    created_at: string;
  }[];
};

export type TwitchOAuthStrategyOutput = {
  id: string;
  login: string;
  display_name: string;
  description: string;
  profile_image_url: string;
  view_count: number;
  email: string;
  type: string;
  broadcaster_type: string;
  offline_image_url: string;
  created_at: string;
};
