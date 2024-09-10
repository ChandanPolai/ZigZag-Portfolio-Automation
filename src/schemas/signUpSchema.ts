import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(2, "Username must have at least 2 characters")
  .max(20, "Username must not have more than 20 characters")
  .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special characters");

export const signUpSchema = z.object({
  username: usernameValidation,
  email: z.string().email("Invalid email address formate"),
  password: z.string().min(6, "Password must have at least 6 characters"),
});
