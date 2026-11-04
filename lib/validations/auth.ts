import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.email("Enter a valid email address"),
  photoURL: z.url("Enter a valid photo URL (starting with https://)"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Password must include an uppercase letter")
    .regex(/[a-z]/, "Password must include a lowercase letter"),
});

export type RegisterValues = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginValues = z.infer<typeof loginSchema>;