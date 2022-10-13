import { beforeEach, describe, it, expect } from "vitest";
import { randomUUID as uuid } from "node:crypto";
import Announcement from "../../../domain/entity/announcement";
import AnnouncementRepositoryInMemory from "../../../infra/repository/in-memory/announcement-repository-in-memory";
import ListAnnouncementsByGameUseCase from "./list-announcements-by-game-use-case";
import { convertHourStringToMinutes } from "../../../utils/convert-hour-string-to-minutes";

let announcementRepository: AnnouncementRepositoryInMemory;
let listAnnouncementsByGame: ListAnnouncementsByGameUseCase;

describe("List announcement by game use case", () => {
  beforeEach(() => {
    announcementRepository = new AnnouncementRepositoryInMemory();
    listAnnouncementsByGame = new ListAnnouncementsByGameUseCase(
      announcementRepository
    );
  });

  it("should be able to list announcements by game", async () => {
    const gameId = uuid();
    const announcement = Announcement.create({
      gameId,
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
    const output = await listAnnouncementsByGame.execute({
      gameId,
    });
    expect(output).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "SoloQ Patrick Vrau",
          yearPlaying: 9,
          useVoiceChannel: false,
          weekDays: [0, 6, 5, 4],
          hourStart: "18:00",
          hourEnd: "22:00",
        }),
      ])
    );
    expect(output).toHaveLength(1);
    expect(output[0].name).toBe("SoloQ Patrick Vrau");
  });

  it("should not be able to list announcements by game with game id non existing", async () => {
    expect(() =>
      listAnnouncementsByGame.execute({ gameId: "non-existing" })
    ).rejects.toThrowError("Announcements not found");
  });
});
