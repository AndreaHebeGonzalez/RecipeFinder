import { z } from "zod";
import { searchFilters, mealTypes, preferencesParams, filters, intolerancesList, dietsList } from "../data";
import { IngredientSchema, NutrientSchema, RecipeCardSchema, RecipeCardsListSchema, RecipeInformationSchema, RecipeInstructionsSchema } from "../schemas";

/* Preferences Types */

export type PreferencesParams = typeof preferencesParams[number] //De un array de string obtengo union de literales

type SearchParams = typeof searchFilters[number]


type DietState = {
  selected: boolean,
  disabled: boolean
}

export type DietsOption = typeof dietsList[number]

export type DietsOptions = { [key in DietsOption] : DietState }

export type AllergiesOption = typeof intolerancesList[number]

export type AllergiesOptions = { [key in AllergiesOption] : boolean }

export type PreferencesSearchType = {
  [key in PreferencesParams]: string;
}

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
export type RecipeCard = z.infer<typeof RecipeCardSchema>
export type RecipeCardList = z.infer<typeof RecipeCardsListSchema>
export type RecipeMetrics = { [key in FilterCardsName] : number }
export type RecipesWithMetrics = {
  recipe: RecipeCard
  metrics: RecipeMetrics
}

export type Range = [number, number]

export type RangesType = {
  [key in FilterCardsName] : Range
}

export type RangeType<K extends FilterCardsName> = Pick<RangesType, K>; //Defino el tipo genérico RangeType 

export type RecipeIngredients = z.infer<typeof IngredientSchema>

export type RecipeInformation = z.infer<typeof RecipeInformationSchema>

type RecipeInstructions = z.infer<typeof RecipeInstructionsSchema>

export type RecipeDetailSubset = RecipeInformation & {
  instructions: RecipeInstructions
}

export type RecipeDetails = RecipeDetailSubset &  {
  nutrients: NutrientType[]
}