import { z } from "zod";

export const authenticateByDiscordSchema = z.object({
  code: z.string().min(0),
});

export type AuthenticateByDiscordSchema = z.infer<
  typeof authenticateByDiscordSchema
>;
