import { Request, Response } from "express";
import { ListAnnouncementsByGameSchema } from "../../application/use-cases/list-announcements-by-game/list-announcements-by-game-schema";
import ListAnnouncementsByGameUseCase from "../../application/use-cases/list-announcements-by-game/list-announcements-by-game-use-case";

export default class ListAnnouncementsByGameController {
  readonly #listAnnouncementsByGameUseCase: ListAnnouncementsByGameUseCase;

  constructor(listAnnouncementsByGameUseCase: ListAnnouncementsByGameUseCase) {
    this.#listAnnouncementsByGameUseCase = listAnnouncementsByGameUseCase;
  }

  async handle(request: Request, response: Response) {
    const { gameId } = request.params as ListAnnouncementsByGameSchema;
    const output = await this.#listAnnouncementsByGameUseCase.execute({
      gameId,
    });
    return response.json(output);
  }
}
