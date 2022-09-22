import AnnouncementRepository from "../../../domain/repository/announcement-repository";
import {
  GetAnnouncementByDiscordInput,
  GetAnnouncementByDiscordOutput,
} from "./get-announcement-by-discord-dto";

export default class GetAnnouncementByDiscordUseCase {
  readonly #announcementRepository: AnnouncementRepository;

  constructor(announcementRepository: AnnouncementRepository) {
    this.#announcementRepository = announcementRepository;
  }

  async execute(
    input: GetAnnouncementByDiscordInput
  ): Promise<GetAnnouncementByDiscordOutput> {
    const announcement =
      await this.#announcementRepository.findAnnouncementById(
        input.announcementId
      );
    const isAnnouncementExisting = !!announcement;
    if (!isAnnouncementExisting) {
      throw new Error("Announcement not found");
    }
    return {
      discord: announcement.discord,
    };
  }
}
