import { z } from "zod";

export const listAnnouncementsByGameSchema = z.object({
  gameId: z.string().min(1).uuid(),
});

export type ListAnnouncementsByGameSchema = z.infer<
  typeof listAnnouncementsByGameSchema
>;
