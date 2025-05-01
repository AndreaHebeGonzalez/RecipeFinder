import { z } from "zod";
import { searchFilters, mealTypes, preferencesParams, filters } from "../data";
import { RecipeCardSchema, RecipeCarsListSchema } from "../schemas";

/* Preferences Types */

export type PreferencesParams = typeof preferencesParams[number] //De un array de string obtengo union de literales

type SearchParams = typeof searchFilters[number]


type DietState = {
  selected: boolean,
  disabled: boolean
}

export type DietsOptions = { [key:string] : DietState }

export type AllergiesOptions = { [key:string] : boolean }

export type PreferencesSearchType = {
  [key in PreferencesParams]: string;
}

/* Search Types */

export type MealTypes = typeof mealTypes[number]

export type SearchFilterType = {
  [key in SearchParams]: key extends 'type' 
    ? MealTypes 
    : string;
}


/* Query Filter Types */

export type ParamsType = PreferencesParams | SearchParams

export type QueryFilters = {
  [key in ParamsType]: string;
}

export type Filters = Partial<QueryFilters>

/* Recipe Types */

export type RecipeCard = z.infer<typeof RecipeCardSchema>
export type RecipeCardList = z.infer<typeof RecipeCarsListSchema>


/* Filters Cards */

export type FilterCardsName = keyof typeof filters; // "Calories" | "Protein" | ...
export type FiltersCards = typeof filters;

export type rangesType = {
  [key in FilterCardsName] : [number, number] 
}