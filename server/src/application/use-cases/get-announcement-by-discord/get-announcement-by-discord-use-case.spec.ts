import { it, expect, describe, beforeEach } from "vitest";
import AnnouncementRepositoryInMemory from "../../../infra/repository/in-memory/announcement-repository-in-memory";
import GetAnnouncementByDiscordUseCase from "./get-announcement-by-discord-use-case";

let announcementRepository: AnnouncementRepositoryInMemory;
let getAnnouncementByDiscordUseCase: GetAnnouncementByDiscordUseCase;

describe("Get announcement by discord use case", () => {
  beforeEach(() => {
    announcementRepository = new AnnouncementRepositoryInMemory();
    getAnnouncementByDiscordUseCase = new GetAnnouncementByDiscordUseCase(
      announcementRepository
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
