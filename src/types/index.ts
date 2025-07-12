import { searchFilters, preferencesParams,  intolerancesList, dietsList } from "../data";


/* Preferences Types */

export type PreferencesParams = typeof preferencesParams[number] //De un array de string obtengo union de literales

export type SearchParams = typeof searchFilters[number]


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

/* export type NutrientKeys = typeof nutrients[number]
 */


/* Error types */

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




