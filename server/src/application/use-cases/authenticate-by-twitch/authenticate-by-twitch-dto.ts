export type AuthenticateByTwitchInput = {
  code: string;
};

export type AuthenticateByTwitchOutput = {
  id: string;
  login: string;
  display_name: string;
  description: string;
  profile_image_url: string;
  view_count: number;
  email: string;
  created_at: string;
};
