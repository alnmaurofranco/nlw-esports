import { it, describe, expect } from "vitest";
import Game from "./game";

describe("Game Domain", () => {
  it("Deve criar um game", () => {
    const game = new Game({
      title: "League of Legends",
      bannerURL: "https://www.leagueoflegends.com/pt-br",
    });
    expect(game).toBeTruthy();
    expect(game.id).toBeDefined();
    expect(game.getJSON()).toMatchObject({
      title: "League of Legends",
      bannerURL: "https://www.leagueoflegends.com/pt-br",
    });
  });

  it("Deve lançar um erro ao criar um game com nome inválido ou vazio", () => {
    expect(() => {
      return new Game({
        title: "",
        bannerURL: "https://game-non-existing.com.br",
      });
    }).toThrowError("Title cannot be empty");
  });

  it("Deve lançar um erro ao criar um game com o banner url inválido ou vazio", () => {
    expect(() => {
      return new Game({
        title: "DOTA 2",
        bannerURL: "",
      });
    }).toThrowError("Banner URL cannot be empty");
  });
});
