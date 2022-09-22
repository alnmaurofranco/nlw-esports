import ListAnnouncementsByGameUseCase from "../../application/use-cases/list-announcements-by-game/list-announcements-by-game-use-case";
import ListAnnouncementsByGameController from "../controller/list-announcements-by-game-controller";
import AnnouncementRepositoryPrisma from "../repository/database/announcement-repository-prisma";

export default function ListAnnouncementsByGameFactory(): ListAnnouncementsByGameController {
  const announcementRepository = new AnnouncementRepositoryPrisma();
  const listAnnouncementsByGameUseCase = new ListAnnouncementsByGameUseCase(
    announcementRepository
  );
  return new ListAnnouncementsByGameController(listAnnouncementsByGameUseCase);
}
