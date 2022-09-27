import { z } from "zod";

export const authenticateEmailSchema = z.object({
  email: z.string().email(),
});

export type AuthenticateEmailSchema = z.infer<typeof authenticateEmailSchema>;
