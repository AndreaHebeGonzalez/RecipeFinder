import { z } from "zod"
import { loginSchema, registerSchema } from "../schemas/registerSchema.ts"

export type RegisterFormData = z.infer<typeof registerSchema>

export type LoginFormData = z.infer<typeof loginSchema>