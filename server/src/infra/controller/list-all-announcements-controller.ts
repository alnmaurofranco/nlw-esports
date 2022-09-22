import { Request, Response } from "express";

import ListAllAnnouncementsUseCase from "../../application/use-cases/list-all-announcements/list-all-announcements-use-case";

export default class ListAllAnnouncementsController {
  readonly #listAllAnnouncementsUseCase: ListAllAnnouncementsUseCase;

  constructor(listAllAnnouncementsUseCase: ListAllAnnouncementsUseCase) {
    this.#listAllAnnouncementsUseCase = listAllAnnouncementsUseCase;
  }

  async handle(request: Request, response: Response) {
    const output = await this.#listAllAnnouncementsUseCase.execute();
    return response.json(output);
  }
}
