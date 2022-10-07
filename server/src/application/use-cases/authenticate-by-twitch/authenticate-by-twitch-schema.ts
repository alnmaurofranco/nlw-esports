import { z } from "zod";

export const authenticateByTwitchSchema = z.object({
  code: z.string(),
});

export type AuthenticateByTwitchSchema = z.infer<
  typeof authenticateByTwitchSchema
>;
