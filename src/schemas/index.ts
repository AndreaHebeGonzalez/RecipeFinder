import { z } from "zod";


export const PreferencesSearchSchema = z.object({
  diets: z.array(z.string()),
  allergies: z.array(z.string())
})

export const RecipeCardSchema = z.object({
  id: z.number(),
  title: z.string(),
  image: z.string()
})

export const RecipeDetailsSchema = z.object({

})

export const RecipeCarsListSchema = z.array(RecipeCardSchema)


