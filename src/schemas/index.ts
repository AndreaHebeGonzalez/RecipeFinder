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

export const IngredientSchema = z.object({
  amount: z.object({
    metric: z.object({
      unit: z.string(),
      value: z.number()
    })
  }),
  image: z.string(),
  name: z.string()
})

export const RecipeIngredientsSchema = z.object({
    ingredients: z.array(IngredientSchema) 
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

const intructionSchema = z.object({
  name: z.string(), //Nombre de la preparación
  steps: z.array(stepSchema)
})

export const RecipeInstructionsSchema = z.array(intructionSchema)

