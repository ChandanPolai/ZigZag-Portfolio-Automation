import { z } from "zod";

export const verifySchema = z.object({
  verifyCode: z.string().length(6, "Verification code must have 6 digits"),
});
