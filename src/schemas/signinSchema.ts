import { z } from "zod";

export const signInSchema = z.object({
  identifier: z.string().min(2,"requires at least 2 characters"),
  password: z.string().min(6, "password must have at least 6 characters"),
});
