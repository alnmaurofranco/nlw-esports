import {
  Game as GamePrisma,
  Announcement as AnnouncementPrisma,
  Prisma,
} from "@prisma/client";
import Announcement from "../../domain/entity/announcement";
import { GameWithRelationAnnoucementResult } from "../../domain/repository/game-repository";

type GamePersistence = GamePrisma & {
  announcements: AnnouncementPrisma[];
  _count: Prisma.GameCountOutputType;
};

export default class GameMapper {
  static toDTO(raw: GamePersistence): GameWithRelationAnnoucementResult {
    return {
      id: raw.id,
      title: raw.title,
      bannerURL: raw.bannerURL,
      announcements: raw.announcements.map((announcement) =>
        Announcement.create(
          {
            name: announcement.name,
            weekDays: announcement.weekDays as {
              days: number[];
            },
            useVoiceChannel: announcement.useVoiceChannel,
            hourStart: announcement.hourStart!,
            hourEnd: announcement.hourEnd!,
            yearPlaying: announcement.yearPlaying,
            discord: announcement.discord,
            gameId: announcement.gameId,
            createdAt: announcement.createdAt,
          },
          announcement.id
        ).getJSON()
      ),
      count: raw._count.announcements,
    };
  }
}
