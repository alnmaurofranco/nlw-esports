import { describe, it, expect, beforeEach } from "vitest";
import Announcement from "../../../domain/entity/announcement";
import AnnouncementRepositoryInMemory from "../../../infra/repository/in-memory/announcement-repository-in-memory";
import { convertHourStringToMinutes } from "../../../utils/convert-hour-string-to-minutes";
import ListAllAnnouncementsUseCase from "./list-all-announcements-use-case";

let announcementRepository: AnnouncementRepositoryInMemory;
let listAllAnnouncements: ListAllAnnouncementsUseCase;

describe("List all announcements use case", () => {
  beforeEach(() => {
    announcementRepository = new AnnouncementRepositoryInMemory();
    listAllAnnouncements = new ListAllAnnouncementsUseCase(
      announcementRepository
    );
  });

  it("should be able to list all announcements", async () => {
    const announcement = Announcement.create({
      gameId: "id-existing",
      name: "NAMI",
      yearPlaying: 3,
      discord: "auth-discord",
      weekDays: {
        days: [0, 6, 5, 4],
      },
      hourStart: convertHourStringToMinutes("18:00"),
      hourEnd: convertHourStringToMinutes("22:00"),
      useVoiceChannel: false,
    });
    const announcementE = Announcement.create({
      gameId: "id-existing",
      name: "IS GOD",
      yearPlaying: 8,
      discord: "auth-discord",
      weekDays: {
        days: [0, 6, 5, 4],
      },
      hourStart: convertHourStringToMinutes("18:00"),
      hourEnd: convertHourStringToMinutes("22:00"),
      useVoiceChannel: false,
    });
    announcementRepository.create(announcement);
    announcementRepository.create(announcementE);
    const output = await listAllAnnouncements.execute();
    expect(output).toHaveLength(2);
  });

  it("should not be able to list all announcements", async () => {
    expect(() => listAllAnnouncements.execute()).rejects.toThrowError(
      new Error("No announcements found")
    );
  });
});
