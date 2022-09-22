import CreateAnnouncementUseCase from "../../application/use-cases/create-announcement/create-announcement-use-case";
import AnnouncementRepository from "../../domain/repository/announcement-repository";
import GameRepository from "../../domain/repository/game-repository";
import CreateAnnouncementController from "../controller/create-announcement-controller";
import AnnouncementRepositoryPrisma from "../repository/database/announcement-repository-prisma";
import GameRepositoryPrisma from "../repository/database/game-repository-prisma";

export default function CreateAnnouncementFactory(): CreateAnnouncementController {
  const announcementRepository: AnnouncementRepository =
    new AnnouncementRepositoryPrisma();
  const gameRepository: GameRepository = new GameRepositoryPrisma();
  const createAnnouncementUseCase = new CreateAnnouncementUseCase(
    announcementRepository,
    gameRepository
  );
  return new CreateAnnouncementController(createAnnouncementUseCase);
}
