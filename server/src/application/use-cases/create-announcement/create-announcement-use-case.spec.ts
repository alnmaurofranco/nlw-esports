import { beforeEach, describe, it, expect } from "vitest";
import { randomUUID as uuid } from "node:crypto";
import AnnouncementRepositoryInMemory from "../../../infra/repository/in-memory/announcement-repository-in-memory";
import GameRepositoryInMemory from "../../../infra/repository/in-memory/game-repository-in-memory";
import CreateAnnouncementUseCase from "./create-announcement-use-case";
import Announcement from "../../../domain/entity/announcement";
import { convertHourStringToMinutes } from "../../../utils/convert-hour-string-to-minutes";
import Game from "../../../domain/entity/game";

let announcementRepository: AnnouncementRepositoryInMemory;
let gameRepository: GameRepositoryInMemory;
let createAnnouncement: CreateAnnouncementUseCase;

describe("Create announcement use case", () => {
  beforeEach(() => {
    announcementRepository = new AnnouncementRepositoryInMemory();
    gameRepository = new GameRepositoryInMemory();
    createAnnouncement = new CreateAnnouncementUseCase(
      announcementRepository,
      gameRepository
    );
  });

  it("should be able to create announcement", async () => {
    const game = Game.create({
      title: "League of Legends",
      bannerURL: "https://leagueoflegends.com/pt-br",
    });
    await gameRepository.create(game);
    const input = {
      gameId: game.id,
      name: "mar",
      discord: "<NAMI 💻/>#1482",
      yearPlaying: 5,
      weekDays: {
        days: [1, 2],
      },
      hourStart: "12:00",
      hourEnd: "05:00",
      useVoiceChannel: false,
    };
    await createAnnouncement.execute(input);
    expect(announcementRepository.items).toHaveLength(1);
    expect(announcementRepository.items.length).toBe(1);
  });

  it("should not be able to create announcement with game id non existing", async () => {
    expect(() =>
      createAnnouncement.execute({
        gameId: "non-existing",
        name: "mar",
        discord: "<NAMI 💻/>#1482",
        yearPlaying: 5,
        weekDays: {
          days: [1, 2],
        },
        hourStart: "12:00",
        hourEnd: "05:00",
        useVoiceChannel: false,
      })
    ).rejects.toThrowError("Game does not exists");
  });
});
