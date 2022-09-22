import { describe, it, expect, beforeEach } from "vitest";
import Game from "../../../domain/entity/game";
import GameRepositoryInMemory from "../../../infra/repository/database/in-memory/game-repository-in-memory";
import ListAllGamesUseCase from "./list-all-games-use-case";

let gameRepository: GameRepositoryInMemory;
let listAllGames: ListAllGamesUseCase;

describe("List all games use case", () => {
  beforeEach(() => {
    gameRepository = new GameRepositoryInMemory();
    listAllGames = new ListAllGamesUseCase(gameRepository);
  });
  it("should be able to list all games", async () => {
    const game1 = new Game({
      title: "Game 1",
      bannerURL: "https://banner1.com",
    });
    const game2 = new Game({
      title: "Game 2",
      bannerURL: "https://banner2.com",
    });
    await gameRepository.create(game1);
    await gameRepository.create(game2);
    const output = await listAllGames.execute();
    expect(output).toHaveLength(2);
  });
});
