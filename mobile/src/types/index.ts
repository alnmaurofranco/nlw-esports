export type Game = {
  id: string;
  title: string;
  bannerURL: string;
  _count: {
    announcements: number;
  };
};

export type Announcement = {
  id: string;
  name: string;
  weekDays: number[];
  useVoiceChannel: boolean;
  hourStart: string;
  hourEnd: string;
  yearPlaying: number;
};
