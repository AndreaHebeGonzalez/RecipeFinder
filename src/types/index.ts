import { searchFilters, mealTypes, preferencesParams } from "../data";

/* Preferences Types */

export type PreferencesParams = typeof preferencesParams[number]

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


/* Filter Types */

export type ParamsType = PreferencesParams | SearchParams

export type QueryFilters = {
  [key in ParamsType]: string;
}

export type Filters = Partial<QueryFilters>

