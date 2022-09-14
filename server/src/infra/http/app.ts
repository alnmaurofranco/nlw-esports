import cors from "cors";
import express, { Application } from "express";
import { prisma } from "../../database/prisma";
import { convertHourStringToMinutes } from "../../utils/convert-hour-string-to-minutes";
import { convertMinutesAmountToHourString } from "../../utils/convert-minutes-to-hour-string";

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.get("/games", async (request, response) => {
  const games = await prisma.game.findMany({
    include: {
      announcements: true,
      _count: true,
    },
  });
  if (!games.length) {
    throw new Error("List games does not exists in moment.");
  }
  return response.json(games);
});
app.post("/games/:id/ads", async (request, response) => {
  const { id: gameId } = request.params;
  const {
    name,
    yearPlaying,
    weekDays,
    discord,
    hourEnd,
    hourStart,
    useVoiceChannel,
  } = request.body as {
    name: string;
    yearPlaying: number;
    weekDays: { days: number[] };
    discord: string;
    hourEnd: string;
    hourStart: string;
    useVoiceChannel: boolean;
  };
  const game = await prisma.game.findUniqueOrThrow({
    select: {
      id: true,
    },
    where: {
      id: gameId,
    },
  });
  await prisma.announcement.create({
    data: {
      name,
      gameId: game.id,
      yearPlaying,
      discord,
      weekDays,
      hourStart: convertHourStringToMinutes(hourStart),
      hourEnd: convertHourStringToMinutes(hourEnd),
      useVoiceChannel,
    },
  });
  return response.status(201).send();
});
app.get("/games/:id/ads", async (request, response) => {
  const { id: gameId } = request.params;
  const announcements: {
    id: string;
    name: string;
    weekDays: any;
    useVoiceChannel: boolean;
    hourStart: number;
    hourEnd: number;
    yearPlaying: number;
  }[] = await prisma.announcement.findMany({
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
  return response.json(
    announcements.map((announcement) => {
      return {
        ...announcement,
        weekDays: announcement.weekDays.days,
        hourStart: convertMinutesAmountToHourString(announcement.hourStart),
        hourEnd: convertMinutesAmountToHourString(announcement.hourEnd),
      };
    })
  );
});
app.get("/ads/:id/discord", async (request, response) => {
  const { id: announcementId } = request.params;
  const announcement = await prisma.announcement.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: announcementId,
    },
  });
  return response.json(announcement);
});
app.get("/ads", async (request, response) => {
  const announcements = await prisma.announcement.findMany({
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
  });
  return response.json(
    announcements.map((announcement) => ({
      id: announcement.id,
      name: announcement.name,
      weekDays: announcement.weekDays,
      useVoiceChannel: announcement.useVoiceChannel,
      hourStart: convertMinutesAmountToHourString(announcement.hourStart),
      hourEnd: convertMinutesAmountToHourString(announcement.hourEnd),
      yearPlaying: announcement.yearPlaying,
      createdAt: announcement.createdAt,
    }))
  );
});
export default app;
