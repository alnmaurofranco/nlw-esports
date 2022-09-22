import { z } from "zod";

export const createAnnouncementSchema = z.object({
  gameId: z.string().min(1).uuid(),
  name: z.string().min(3).max(50),
  discord: z.string().min(3).max(50),
  hourStart: z.string().min(0),
  hourEnd: z.string().min(0),
  useVoiceChannel: z.boolean(),
  weekDays: z.object({
    days: z.array(z.number()),
  }),
  yearPlaying: z.number().min(0).max(50),
});

export type CreateAnnouncementSchema = z.infer<typeof createAnnouncementSchema>;
