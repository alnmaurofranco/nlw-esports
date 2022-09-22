import AnnouncementRepository from "../../../domain/repository/announcement-repository";
import { convertMinutesAmountToHourString } from "../../../utils/convert-minutes-to-hour-string";
import {
  ListAnnouncementsByGameInput,
  ListAnnouncementsByGameOutput,
} from "./list-announcements-by-game-dto";

export default class ListAnnouncementsByGameUseCase {
  readonly #announcementRepository: AnnouncementRepository;

  constructor(announcementRepository: AnnouncementRepository) {
    this.#announcementRepository = announcementRepository;
  }

  async execute(
    input: ListAnnouncementsByGameInput
  ): Promise<ListAnnouncementsByGameOutput> {
    const announcements =
      await this.#announcementRepository.findAllAnnoucementByGameId(
        input.gameId
      );
    if (!announcements) {
      throw new Error("Announcements not found");
    }
    return announcements.map((announcement) => {
      return {
        name: announcement.name,
        yearPlaying: announcement.yearPlaying,
        useVoiceChannel: announcement.useVoiceChannel,
        weekDays: announcement.weekDays.days,
        hourStart: convertMinutesAmountToHourString(announcement.hourStart),
        hourEnd: convertMinutesAmountToHourString(announcement.hourEnd),
      };
    });
  }
}
