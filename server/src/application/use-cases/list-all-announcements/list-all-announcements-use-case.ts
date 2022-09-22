import AnnouncementRepository from "../../../domain/repository/announcement-repository";
import { convertMinutesAmountToHourString } from "../../../utils/convert-minutes-to-hour-string";
import { ListAllAnnouncementsOutput } from "./list-all-announcements-dto";

export default class ListAllAnnouncementsUseCase {
  readonly #announcementRepository: AnnouncementRepository;

  constructor(announcementRepository: AnnouncementRepository) {
    this.#announcementRepository = announcementRepository;
  }

  async execute(): Promise<ListAllAnnouncementsOutput> {
    const announcements =
      await this.#announcementRepository.findAllAnnoucement();
    if (!announcements) {
      throw new Error("No announcements found");
    }
    return announcements.map((announcement) => ({
      id: announcement.id,
      name: announcement.name,
      weekDays: announcement.weekDays,
      useVoiceChannel: announcement.useVoiceChannel,
      hourStart: convertMinutesAmountToHourString(announcement.hourStart),
      hourEnd: convertMinutesAmountToHourString(announcement.hourEnd),
      yearPlaying: announcement.yearPlaying,
      createdAt: announcement.createdAt,
    }));
  }
}
