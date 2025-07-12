import { z } from "zod"
import { NutrientSchema } from "../../recipes/schemas"

/* AI Schemas */

export const aiIngredientsSchema = z.array(z.object({
    name: z.string(),
    quantity: z.string(),
    id: z.string()
  }))

export const aiInstructionsSchema = z.array(z.object({
    title: z.string().optional(),
    steps: z.array(z.object({
      stepNumber: z.number(),
      step: z.string()
    }))
  }))

export const RecipeAISchema = z.object({
  title: z.string(),
  ingredients: aiIngredientsSchema,
  steps: aiInstructionsSchema,
  nutrition: z.object({
    nutrients: z.array(NutrientSchema), // Nutrientes que necesitas
  }),
})

export const RecipeAIErrorSchema = z.object({
  error: z.string()
}) 