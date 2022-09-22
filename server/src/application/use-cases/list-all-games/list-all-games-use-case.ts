import GameRepository from "../../../domain/repository/game-repository";
import { ListAllGamesOutput } from "./list-all-games-dto";

export default class ListAllGamesUseCase {
  readonly #gameRepository: GameRepository;

  constructor(gameRepository: GameRepository) {
    this.#gameRepository = gameRepository;
  }

  async execute(): Promise<ListAllGamesOutput> {
    const games =
      await this.#gameRepository.findAllGamesWithAnnoucementAndCount();
    if (!games) {
      throw new Error("No games found");
    }
    return games.map((game) => {
      return {
        id: game.id,
        title: game.title,
        bannerURL: game.bannerURL,
        announcements: game.announcements,
        count: game.count,
      };
    });
  }
}
