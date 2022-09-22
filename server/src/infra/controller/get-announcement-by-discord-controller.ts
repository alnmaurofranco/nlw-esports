import { Request, Response } from "express";
import { GetAnnouncementByDiscordSchema } from "../../application/use-cases/get-announcement-by-discord/get-announcement-by-discord-schema";
import GetAnnouncementByDiscordUseCase from "../../application/use-cases/get-announcement-by-discord/get-announcement-by-discord-use-case";

export default class GetAnnouncementByDiscordController {
  readonly #getAnnouncementByDiscordUseCase: GetAnnouncementByDiscordUseCase;

  constructor(
    getAnnouncementByDiscordUseCase: GetAnnouncementByDiscordUseCase
  ) {
    this.#getAnnouncementByDiscordUseCase = getAnnouncementByDiscordUseCase;
  }

  async handle(request: Request, response: Response) {
    const paramsData = {
      announcementId: request.params.announcementId,
    } as GetAnnouncementByDiscordSchema;
    const announcement = await this.#getAnnouncementByDiscordUseCase.execute(
      paramsData
    );
    return response.status(200).json(announcement);
  }
}
