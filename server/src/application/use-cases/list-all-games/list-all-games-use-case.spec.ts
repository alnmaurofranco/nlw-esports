import { describe, it, expect, beforeEach } from "vitest";
import Game from "../../../domain/entity/game";
import GameRepositoryInMemory from "../../../infra/repository/in-memory/game-repository-in-memory";
import ListAllGamesUseCase from "./list-all-games-use-case";

let gameRepository: GameRepositoryInMemory;
let listAllGames: ListAllGamesUseCase;

describe("List all games use case", () => {
  beforeEach(() => {
    gameRepository = new GameRepositoryInMemory();
    listAllGames = new ListAllGamesUseCase(gameRepository);
  });
  it("should be able to list all games", async () => {
    const game1 = Game.create({
      title: "Game 1",
      bannerURL: "https://banner1.com",
    });
    const game2 = Game.create({
      title: "Game 2",
      bannerURL: "https://banner2.com",
    });
    await gameRepository.create(game1);
    await gameRepository.create(game2);
    const output = await listAllGames.execute();
    expect(output).toHaveLength(2);
  });

  it("should not be able to list all games", async () => {
    expect(() => listAllGames.execute()).rejects.toThrowError(
      new Error("No games found")
    );
  });
});
