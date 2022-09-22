import ListAllGamesUseCase from "../../application/use-cases/list-all-games/list-all-games-use-case";
import ListAllGamesController from "../controller/list-all-games-controller";
import GameRepositoryPrisma from "../repository/database/game-repository-prisma";

export default function ListAllGamesFactory(): ListAllGamesController {
  const gameRepository = new GameRepositoryPrisma();
  const listAllGamesUseCase = new ListAllGamesUseCase(gameRepository);
  return new ListAllGamesController(listAllGamesUseCase);
}
