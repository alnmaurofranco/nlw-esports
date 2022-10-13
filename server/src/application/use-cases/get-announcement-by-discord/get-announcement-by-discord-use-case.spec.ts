import { it, expect, describe, beforeEach } from "vitest";
import Announcement from "../../../domain/entity/announcement";
import AnnouncementRepositoryInMemory from "../../../infra/repository/in-memory/announcement-repository-in-memory";
import { convertHourStringToMinutes } from "../../../utils/convert-hour-string-to-minutes";
import GetAnnouncementByDiscordUseCase from "./get-announcement-by-discord-use-case";
import { randomUUID as uuid } from "node:crypto";

let announcementRepository: AnnouncementRepositoryInMemory;
let getAnnouncementByDiscordUseCase: GetAnnouncementByDiscordUseCase;

describe("Get announcement by discord use case", () => {
  beforeEach(() => {
    announcementRepository = new AnnouncementRepositoryInMemory();
    getAnnouncementByDiscordUseCase = new GetAnnouncementByDiscordUseCase(
      announcementRepository
    );
  });

  it("should be able to get announcement by discord", async () => {
    const announcement = Announcement.create({
      gameId: uuid(),
      name: "SoloQ Patrick Vrau",
      yearPlaying: 9,
      discord: "auth-discord",
      weekDays: {
        days: [0, 6, 5, 4],
      },
      hourStart: convertHourStringToMinutes("18:00"),
      hourEnd: convertHourStringToMinutes("22:00"),
      useVoiceChannel: false,
    });
    await announcementRepository.create(announcement);
    const output = await getAnnouncementByDiscordUseCase.execute({
      announcementId: announcement.id,
    });
    expect(output.discord).toBe(announcement.discord);
    expect(output).toMatchObject(
      expect.objectContaining({
        discord: "auth-discord",
      })
    );
  });

  it("should not be able to get announcement by discord with id non exisiting", async () => {
    expect(() =>
      getAnnouncementByDiscordUseCase.execute({
        announcementId: "non-existing",
      })
    ).rejects.toThrowError(new Error("Announcement not found"));
  });
});
