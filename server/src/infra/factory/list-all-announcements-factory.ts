import ListAllAnnouncementsUseCase from "../../application/use-cases/list-all-announcements/list-all-announcements-use-case";
import ListAllAnnouncementsController from "../controller/list-all-announcements-controller";
import AnnouncementRepositoryPrisma from "../repository/database/announcement-repository-prisma";

export default function ListAllAnnouncementsFactory(): ListAllAnnouncementsController {
  const announcementRepository = new AnnouncementRepositoryPrisma();
  const listAllAnnouncementsUseCase = new ListAllAnnouncementsUseCase(
    announcementRepository
  );
  return new ListAllAnnouncementsController(listAllAnnouncementsUseCase);
}
