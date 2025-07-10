import { z } from "zod";
import { searchFilters, mealTypes, preferencesParams, filters, intolerancesList, dietsList } from "../data";
import { aiIngredientsSchema, aiInstructionsSchema, IngredientSchema, NutrientSchema, RecipeAIErrorSchema, RecipeAISchema, RecipeCardSchema, RecipeInformationSchema, RecipeInstructionsSchema } from "../schemas";

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

/* AI Types */

export type AIRequest = {
  input : string
}

export type aiIngredients = z.infer<typeof aiIngredientsSchema>

export type aiInstructions = z.infer<typeof aiInstructionsSchema>

export type AIRecipe = z.infer<typeof RecipeAISchema> & {
  id: number | string,
  image: string,
  categoryRecipe : 'aiRecipe'
}

export type AIErrorRecipe = z.infer<typeof RecipeAIErrorSchema>


// Este error indica que la IA devolvió un error esperado por una mala entrada del usuario (por ej: ingredientes inválidos)
export type RecipeAIResponse = 
  | { sucess: true, data: AIRecipe }
  | { sucess: false, tagError: true, error: string }
  | { sucess: false, tagError: false, error: string, technicalMessage: string, errorKind: ErrorKind }


export type CustomRecipe = {
  title: string,
  id: number,
  instructions: string[],
  ingredients: string[],
  image: string
}

/* export type NutrientKeys = typeof nutrients[number]
 */

export type ErrorKind = //tipo de errores
  | "http"         // Errores HTTP con status (400, 500, etc.)
  | "network"   // No hay respuesta del servidor (sin status)
  | "apiAuth"     //Error de key //  autenticación fallida con proveedor externo (ej OpenRouter)
  | "auth"         // Usuario no autenticado o sin permisos (redirigir al login)
  | "validation"   // Falló Zod o una validación explícita de campos
  | "parsing"      // JSON inválido o datos incoherentes
  | "unexpected";  // Fallback genérico para bugs o errores no previstos

export type ErrorSource = "ai" | "auth" | "api" | "other" // fuente de errores


export type AppErrorType = {
    hasError: boolean,
    kind: ErrorKind,
    source: ErrorSource,
    status?: number | null,
    generalMessage: string | null,
    technicalMessage: string | null,
  }




