import { PrismaClient } from "@prisma/client";
import { prisma } from "../../../database/prisma";
import Announcement from "../../../domain/entity/announcement";
import AnnouncementRepository from "../../../domain/repository/announcement-repository";
import AnnouncementMapper from "../../mapper/announcement-mapper";

export default class AnnouncementRepositoryPrisma
  implements AnnouncementRepository
{
  readonly #prisma: PrismaClient;

  constructor() {
    this.#prisma = prisma;
  }

  async findAllAnnoucement(): Promise<Announcement[] | undefined> {
    const isAllAnnouncementsExisting = await this.#prisma.announcement.findMany(
      {
        select: {
          id: true,
          name: true,
          weekDays: true,
          useVoiceChannel: true,
          hourStart: true,
          hourEnd: true,
          yearPlaying: true,
          createdAt: true,
        },
      }
    );
    if (!isAllAnnouncementsExisting.length) {
      return undefined;
    }
    return isAllAnnouncementsExisting.map((announcement) =>
      AnnouncementMapper.toDTO<typeof announcement>(announcement)
    );
  }

  async findAllAnnoucementByGameId(
    gameId: string
  ): Promise<Announcement[] | undefined> {
    const isAllAnnouncementsByGame = await this.#prisma.announcement.findMany({
      select: {
        id: true,
        name: true,
        weekDays: true,
        useVoiceChannel: true,
        hourStart: true,
        hourEnd: true,
        yearPlaying: true,
      },
      where: {
        gameId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    if (!isAllAnnouncementsByGame.length) {
      return undefined;
    }
    return isAllAnnouncementsByGame.map((announcement) => {
      return {
        id: announcement.id,
        name: announcement.name,
        weekDays: announcement.weekDays as { days: number[] },
        useVoiceChannel: announcement.useVoiceChannel,
        hourStart: announcement.hourStart,
        hourEnd: announcement.hourEnd,
        yearPlaying: announcement.yearPlaying,
      } as Announcement;
    });
  }

  async findAnnouncementById(
    announcementId: string
  ): Promise<Announcement | undefined> {
    const isAnnouncementExisting = await this.#prisma.announcement.findUnique({
      select: {
        discord: true,
      },
      where: {
        id: announcementId,
      },
    });
    if (!isAnnouncementExisting) {
      return undefined;
    }
    return AnnouncementMapper.toDTO<typeof isAnnouncementExisting>(
      isAnnouncementExisting
    );
  }

  async create({
    name,
    useVoiceChannel,
    hourStart,
    hourEnd,
    discord,
    weekDays,
    yearPlaying,
    gameId,
  }: Announcement) {
    await this.#prisma.announcement.create({
      data: {
        name,
        yearPlaying,
        discord,
        weekDays,
        hourStart,
        hourEnd,
        useVoiceChannel,
        gameId,
      },
    });
  }
}
