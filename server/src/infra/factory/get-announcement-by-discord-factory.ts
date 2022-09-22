import GetAnnouncementByDiscordUseCase from "../../application/use-cases/get-announcement-by-discord/get-announcement-by-discord-use-case";
import AnnouncementRepository from "../../domain/repository/announcement-repository";
import GetAnnouncementByDiscordController from "../controller/get-announcement-by-discord-controller";
import AnnouncementRepositoryPrisma from "../repository/database/announcement-repository-prisma";

export default function GetAnnouncementByDiscordFactory(): GetAnnouncementByDiscordController {
  const announcementRepository: AnnouncementRepository =
    new AnnouncementRepositoryPrisma();
  const getAnnouncementByDiscordUseCase = new GetAnnouncementByDiscordUseCase(
    announcementRepository
  );
  return new GetAnnouncementByDiscordController(
    getAnnouncementByDiscordUseCase
  );
}
