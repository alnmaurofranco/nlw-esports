export type ListAllAnnouncementsOutput = {
  id: string;
  name: string;
  weekDays: {
    days: number[];
  };
  useVoiceChannel: boolean;
  hourStart: string;
  hourEnd: string;
  yearPlaying: number;
  createdAt: Date | undefined;
}[];
