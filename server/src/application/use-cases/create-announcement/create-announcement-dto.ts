export type CreateAnnouncementInput = {
  gameId: string;
  name: string;
  yearPlaying: number;
  weekDays: {
    days: number[];
  };
  discord: string;
  hourEnd: string;
  hourStart: string;
  useVoiceChannel: boolean;
};

export type CreateAnnouncementOutput = void;
