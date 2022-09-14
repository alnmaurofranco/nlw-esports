import { describe, it, expect } from "vitest";
import { convertHourStringToMinutes } from "../../utils/convert-hour-string-to-minutes";
import Announcement from "./announcement";

describe("Announcement Domain", () => {
  it("Deve criar um anúncio", () => {
    const announcement = new Announcement({
      gameId: "id-existing",
      name: "NAMI IS GOD",
      yearPlaying: 8,
      discord: "auth-discord",
      weekDays: { days: [0, 6, 5, 4] },
      hourStart: convertHourStringToMinutes("18:00"),
      hourEnd: convertHourStringToMinutes("22:00"),
      useVoiceChannel: false,
    });
    console.log(announcement.getJSON());
    expect(announcement).toBeTruthy();
    expect(announcement.id).toBeDefined();
  });

  it("Deve criar um anúncio e ativar o voice", () => {
    const announcement = new Announcement({
      gameId: "id-existing",
      name: "Duo no League of Legends",
      yearPlaying: 8,
      discord: "auth-discord",
      weekDays: { days: [0, 6, 5, 4] },
      hourStart: convertHourStringToMinutes("12:00"),
      hourEnd: convertHourStringToMinutes("22:00"),
      useVoiceChannel: false,
    });
    announcement.activeVoiceChannel();
    expect(announcement).toBeTruthy();
    expect(announcement.useVoiceChannel).toBe(true);
  });
});
