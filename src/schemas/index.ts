import { z } from "zod";


export const PreferencesSearchSchema = z.object({
  diets: z.array(z.string()),
  allergies: z.array(z.string())
})

export const NutrientSchema = z.object({
  name: z.string(),
  amount: z.number(),
  percentOfDailyNeeds: z.number(),
  unit: z.string(),
});

export const RecipeCardSchema = z.object({
  id: z.number(),
  title: z.string(),
  image: z.string(),
  summary: z.string(),
  readyInMinutes: z.number(),
  healthScore: z.number(),
  nutrition: z.object({
    nutrients: z.array(NutrientSchema), // Nutrientes que necesitas
  }),
});

export const RecipeCardsListSchema = z.array(RecipeCardSchema);

/* Ingredients Schema */

export const IngredientSchema = z.object({
  name: z.string(),
  originalName: z.string(),
  id: z.number(),
  image: z.string(),
  measures: z.object({
    metric: z.object({
      amount: z.number(),
      unitShort: z.string(),
      unitLong: z.string()
    })
  }),
})

export const RecipeInformationSchema = z.object({
  id: z.number(),
  title: z.string(),
  image: z.string(),
  summary: z.string(),
  readyInMinutes: z.number(),
  healthScore: z.number(),
  dishTypes: z.array(z.string()),
  extendedIngredients: z.array(IngredientSchema)
})

const stepSchema = z.object({
  equipment: z.array(z.object({
    id: z.number(),
    image: z.string(),
    name: z.string()
  })),
  ingredients: z.array(z.object({
    id: z.number(),
    image: z.string(),
    name: z.string()
  })),
  number: z.number(), //numero de paso para la preparacion
  step: z.string()
})

/* Instructions Schema */

const intructionSchema = z.object({
  name: z.string(), //Nombre de la preparación
  steps: z.array(stepSchema)
})

export const RecipeInstructionsSchema = z.array(intructionSchema)



