export type ListAllGamesOutput = {
  id: string;
  title: string;
  bannerURL: string;
  announcements: {
    hourStart: string;
    hourEnd: string;
    gameId: string;
    name: string;
    yearPlaying: number;
    discord: string;
    weekDays: {
      days: number[];
    };
    useVoiceChannel: boolean;
    createdAt?: Date | undefined;
  }[];
  count: number;
}[];
