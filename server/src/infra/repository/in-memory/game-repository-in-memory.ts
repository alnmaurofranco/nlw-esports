import Game from "../../../domain/entity/game";
import GameRepository, {
  GameWithRelationAnnoucementResult,
} from "../../../domain/repository/game-repository";

export default class GameRepositoryInMemory implements GameRepository {
  public items: Game[];

  constructor() {
    this.items = [];
  }

  async findAll(): Promise<Game[] | undefined> {
    return this.items;
  }

  async findAllGamesWithAnnoucementAndCount(): Promise<
    GameWithRelationAnnoucementResult[] | undefined
  > {
    const announcements = [
      {
        hourStart: "00:00",
        hourEnd: "00:00",
        gameId: "1",
        name: "name",
        yearPlaying: 0,
        discord: "discord",
        weekDays: {
          days: [0],
        },
        useVoiceChannel: false,
        createdAt: new Date(),
      },
    ];
    const isGmeWithAnnoucementExisting = this.items.length > 0;
    if (!isGmeWithAnnoucementExisting) {
      return undefined;
    }
    return this.items.map((game) => {
      return {
        id: game.id,
        title: game.title,
        bannerURL: game.bannerURL,
        announcements,
        count: announcements.length,
      };
    });
  }

  async findGameById(id: string): Promise<Game | undefined> {
    const game = this.items.find((game) => game.id === id);
    return game;
  }

  async create(game: Game): Promise<void> {
    this.items.push(game);
  }
}
