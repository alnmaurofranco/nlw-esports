import { Request, Response } from "express";
import ListAllGamesUseCase from "../../application/use-cases/list-all-games/list-all-games-use-case";

export default class ListAllGamesController {
  readonly #listAllGamesUseCase: ListAllGamesUseCase;

  constructor(listAllGamesUseCase: ListAllGamesUseCase) {
    this.#listAllGamesUseCase = listAllGamesUseCase;
  }

  async handle(request: Request, response: Response) {
    const games = await this.#listAllGamesUseCase.execute();
    return response.json(games);
  }
}
