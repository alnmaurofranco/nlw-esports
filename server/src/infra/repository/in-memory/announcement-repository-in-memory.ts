import Announcement from "../../../domain/entity/announcement";
import AnnouncementRepository from "../../../domain/repository/announcement-repository";

export default class AnnouncementRepositoryInMemory
  implements AnnouncementRepository
{
  public items: Announcement[] = [];

  constructor() {
    this.items = [];
  }

  async findAllAnnoucement(): Promise<Announcement[] | undefined> {
    const isAnnouncements = this.items.length > 0;
    if (!isAnnouncements) {
      return undefined;
    }
    return this.items;
  }

  async findAllAnnoucementByGameId(
    gameId: string
  ): Promise<Announcement[] | undefined> {
    const announcementsFilteredByGameId = this.items.filter(
      (announcement) => announcement.gameId === gameId
    );
    const isAnnouncements = announcementsFilteredByGameId.length > 0;
    if (!isAnnouncements) {
      return undefined;
    }
    return announcementsFilteredByGameId;
  }

  async findAnnouncementById(
    announcementId: string
  ): Promise<Announcement | undefined> {
    const isAnnouncementExisting = this.items.find(
      (announcement) => announcement.id === announcementId
    );
    if (!isAnnouncementExisting) {
      return undefined;
    }
    return isAnnouncementExisting;
  }

  async create(announcement: Announcement): Promise<void> {
    this.items.push(announcement);
  }
}
