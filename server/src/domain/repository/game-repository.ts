import Game from "../entity/game";

export type GameWithRelationAnnoucementResult = {
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
};

export default interface GameRepository {
  findAll(): Promise<Game[] | undefined>;
  findAllGamesWithAnnoucementAndCount(): Promise<
    GameWithRelationAnnoucementResult[] | undefined
  >;
  findGameById(id: string): Promise<Game | undefined>;
  create(game: Game): Promise<void>;
}
