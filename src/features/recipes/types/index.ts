import { z } from "zod"
import { mealTypes, filters } from "../../../data"
import { NutrientSchema, RecipeCardSchema, IngredientSchema, RecipeInstructionsSchema, RecipeInformationSchema } from "../schemas"
import type { SearchParams, PreferencesParams } from "../../../types"
import type { AIRecipe } from "../../ai/types" 


/* Search Types */

export type MealTypes = typeof mealTypes[number]

export type SearchFilterType = {
  [key in SearchParams]: key extends 'type' 
    ? MealTypes | ''
    : string;
}

/* Query Filter Types */

export type ParamsType = PreferencesParams | SearchParams

export type QueryFilters = {
  [key in ParamsType]: key extends 'type' 
    ? MealTypes | '' : string 
}

export type Filters = Partial<QueryFilters>

/* Filters Cards */

export type FiltersCards = typeof filters;
export type FilterCardsName = keyof typeof filters; // "Calories" | "Protein" | ...
export type FiltersName = FiltersCards[keyof FiltersCards]['name'] 


/* Recipe Types */

export type NutrientType = z.infer<typeof NutrientSchema>
export type RecipeCard = z.infer<typeof RecipeCardSchema> & {
  categoryRecipe : 'searchRecipe'
}

export type RecipeCardList = RecipeCard[] /* z.infer<typeof RecipeCardsListSchema> */
export type RecipeMetrics = { [key in FilterCardsName] : number }
export type RecipeWithMetrics<T extends RecipeCard | AIRecipe> = {
  recipe: T
  metrics: RecipeMetrics
}

export type Range = [number, number]

export type RangesType = {
  [key in FilterCardsName] : Range
}

export type RangeType<K extends FilterCardsName> = Pick<RangesType, K> //Defino el tipo genérico RangeType 

export type RecipeIngredients = z.infer<typeof IngredientSchema>

export type RecipeInformation = z.infer<typeof RecipeInformationSchema>

type RecipeInstructions = z.infer<typeof RecipeInstructionsSchema>

export type RecipeDetailSubset = RecipeInformation & {
  instructions: RecipeInstructions
}

export type RecipeDetails = RecipeDetailSubset &  {
  categoryRecipe: 'searchRecipe',
  nutrition: {
    nutrients: NutrientType[]
  }
}

/* Favorites type */

export type FavoriteRecipe = RecipeCard | AIRecipe

export type FavoritesList = FavoriteRecipe[]