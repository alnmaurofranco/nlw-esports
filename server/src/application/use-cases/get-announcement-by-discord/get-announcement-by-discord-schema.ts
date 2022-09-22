import { z } from "zod";

export const getAnnouncementByDiscordSchema = z.object({
  announcementId: z.string().uuid(),
});

export type GetAnnouncementByDiscordSchema = z.infer<
  typeof getAnnouncementByDiscordSchema
>;
