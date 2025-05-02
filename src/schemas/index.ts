import { z } from "zod";


export const PreferencesSearchSchema = z.object({
  diets: z.array(z.string()),
  allergies: z.array(z.string())
})

const NutrientSchema = z.object({
  name: z.string(),
  amount: z.number(),
  percentOfDailyNeeds: z.number(),
  unit: z.string(),
});

export const RecipeCardSchema = z.object({
  id: z.number(),
  title: z.string(),
  image: z.string(),
  readyInMinutes: z.number(),
  healthScore: z.number(),
  nutrition: z.object({
    nutrients: z.array(NutrientSchema), // Nutrientes que necesitas
  }),
});

export const RecipeCardsListSchema = z.array(RecipeCardSchema);

/* export const RecipeCardSchema = z.object({
  id: z.number(),
  title: z.string(),
  image: z.string(),
  cookingMinutes: z.number(),
  healthScore: z.number(),
  nutrition: z.object({
    nutrients: z.array(
      z.object({
        name: z.string(),
        amount: z.number(),
        percentOfDailyNeeds: z.number(),
        unit: z.string(),
      })
    )
  })
})

export const RecipeCardsListSchema = z.array(RecipeCardSchema) */


