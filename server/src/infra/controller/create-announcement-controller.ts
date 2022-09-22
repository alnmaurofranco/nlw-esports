import { Request, Response } from "express";
import { CreateAnnouncementSchema } from "../../application/use-cases/create-announcement/create-announcement-schema";
import CreateAnnouncementUseCase from "../../application/use-cases/create-announcement/create-announcement-use-case";

export default class CreateAnnouncementController {
  readonly #createAnnouncementUseCase: CreateAnnouncementUseCase;

  constructor(createAnnouncementUseCase: CreateAnnouncementUseCase) {
    this.#createAnnouncementUseCase = createAnnouncementUseCase;
  }

  async handle(request: Request, response: Response) {
    const requestParams = {
      ...request.body,
      ...request.params,
    } as CreateAnnouncementSchema;
    await this.#createAnnouncementUseCase.execute(requestParams);
    return response.status(201).send();
  }
}
