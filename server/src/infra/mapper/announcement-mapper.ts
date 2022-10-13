import { Announcement as AnnouncementPersistence } from "@prisma/client";
import Announcement from "../../domain/entity/announcement";

export default class AnnouncementMapper {
  static toDomain(announcement: AnnouncementPersistence): Announcement {
    return Announcement.create(
      {
        name: announcement.name,
        yearPlaying: announcement.yearPlaying,
        weekDays: announcement.weekDays as { days: number[] },
        hourStart: announcement.hourStart,
        hourEnd: announcement.hourEnd,
        useVoiceChannel: announcement.useVoiceChannel,
        discord: announcement.discord,
        gameId: announcement.gameId,
        createdAt: announcement.createdAt,
      },
      announcement.id
    );
  }

  toPersistence(announcement: Announcement): AnnouncementPersistence {
    return {
      id: announcement.id,
      name: announcement.name,
      yearPlaying: announcement.yearPlaying,
      weekDays: announcement.weekDays,
      hourStart: announcement.hourStart,
      hourEnd: announcement.hourEnd,
      useVoiceChannel: announcement.useVoiceChannel,
      discord: announcement.discord,
      gameId: announcement.gameId,
      createdAt: announcement.createdAt ?? new Date(),
    };
  }

  static toDTO<T>(announcement: T): Announcement {
    return announcement as Announcement;
  }
}
