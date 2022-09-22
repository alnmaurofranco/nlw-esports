export type ListAnnouncementsByGameInput = {
  gameId: string;
};

export type ListAnnouncementsByGameOutput = Array<{
  hourStart: string;
  hourEnd: string;
  name: string;
  yearPlaying: number;
  weekDays: number[];
  useVoiceChannel: boolean;
}>;
