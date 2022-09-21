import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../../database/prisma";
import { convertMinutesAmountToHourString } from "../../utils/convert-minutes-to-hour-string";
import zodAdapter from "../../validation/zod-adapter";
import CreateAnnouncementFactory from "../factory/create-announcement-factory";
import ListAllGamesFactory from "../factory/list-all-games-factory";
import ListAnnouncementsByGameFactory from "../factory/list-announcements-by-game-factory";

const createAnnouncementSchema = z.object({
  name: z.string().min(3).max(50),
  // discord: z.string().min(3).max(50),
  // hourStart: z.number().min(0).max(1439),
  // hourEnd: z.number().min(0).max(1439),
  useVoiceChannel: z.boolean(),
  // weekDays: z.array(z.number().min(0).max(6)),
  // yearPlaying: z.number().min(0).max(50),
});
const listAnnouncementsByGameSchema = z.object({
  gameId: z.string().uuid(),
});

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.get("/games", async (request, response) => {
  return ListAllGamesFactory().handle(request, response);
});
app.post(
  "/games/:gameId/ads",
  zodAdapter(createAnnouncementSchema),
  async (request, response) => {
    return CreateAnnouncementFactory().handle(request, response);
  }
);
app.get(
  "/games/:gameId/ads",
  zodAdapter(listAnnouncementsByGameSchema),
  async (request, response) => {
    return ListAnnouncementsByGameFactory().handle(request, response);
  }
);
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
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof z.ZodError) {
      const err = error.errors;
      return response.status(400).json(err);
    }
    return response.status(500).json({
      message: "Internal server error",
    });
  }
);
export default app;
