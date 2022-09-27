import Announcement from "../entity/announcement";

export default interface AnnouncementRepository {
  findAllAnnoucement(): Promise<Announcement[] | undefined>;
  findAllAnnoucementByGameId(
    gameId: string
  ): Promise<Announcement[] | undefined>;
  findAnnouncementById(
    announcementId: string
  ): Promise<Announcement | undefined>;
  create(announcement: Announcement): Promise<void>;
}
