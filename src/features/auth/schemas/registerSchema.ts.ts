import { z } from 'zod'

export const registerSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  username: z.string().min(1, "Username is required").min(3, "Username must be at least 3 characters"),
  password: z
  .string()
  .min(1, "Password is required")
  .min(8, "Password must be at least 8 characters")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character"),
  repeatPassword: z.string().min(1, "Please repeat your password")
}).refine((data) => data.password === data.repeatPassword, {
  message: "Passwords must match",
  path: ["repeatPassword"]
})


export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required")
})