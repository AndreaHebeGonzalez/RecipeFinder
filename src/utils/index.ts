import { filters } from "../data";
import { RecipeCard, FilterCardsName, RecipeWithMetrics, RecipeDetailSubset, RecipeDetails, AIRecipe } from "../types";

export const getHeight = (element: HTMLElement | null) => {
    if (!element) return 0;
    //const rect = element.getBoundingClientRect()
    const height = element.scrollHeight //rect.height;
    return height //parseFloat(height.toFixed(2))
}

/*
export const getPadding = (element: HTMLElement | null) => {
    if (!element) return 0;
    const style = window.getComputedStyle(element);
    return parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
    
};

export const getGap = (element: HTMLElement | null) => {
    if(!element) return 0
    const style = window.getComputedStyle(element)
    return parseFloat(style.rowGap)
} */

export const getRecipeFilterValues = <T extends RecipeCard | AIRecipe>(recipe : T) : { [key in FilterCardsName] : number } => {
    const filtersKey = (Object.keys(filters) as Array<FilterCardsName>)
    const recipeFilterValues = filtersKey.reduce((acc, filter) => {
      const nutrient = recipe.nutrition?.nutrients?.find(nutrient => nutrient.name === filter)
      acc[filter] = nutrient ? nutrient.amount : 0
      return acc
    }, {} as { [key in FilterCardsName] : number })
    return recipeFilterValues
}

export const getRecipesFiltersValues = <T extends RecipeCard | AIRecipe>(recipes : T[]) : RecipeWithMetrics<T>[] => {
  const recipesWithMetrics = recipes.map(recipe => ({
      recipe,
      metrics: getRecipeFilterValues(recipe)
  }))
  return recipesWithMetrics
}


export const getRecipeFormat = (recipe : RecipeCard, recipeDetailSubset : RecipeDetailSubset ) : RecipeDetails => {
    const recipeDetails = {
    ...recipeDetailSubset,
    nutrition: recipe.nutrition,
    categoryRecipe: recipe.categoryRecipe
    }
    return recipeDetails
}


export const getMessageError = (status: number, isAuthError = false) => {
  switch (status) {
    case 400: 
      return "The service is currently unavailable. Please try again later." //El request fue malformado-Mostrar este mensaje. No redirigir.
    case  401:
      return  !isAuthError ? "The recipe generation service is currently unavailable due to a configuration issue. Please contact the administrator or try again later." :  "Your session expired. Please log in again."//Falta autenticación -Redirigir automáticamente al login o sugerir botón.
    case 403: 
      return !isAuthError ? "Oops! We couldn’t generate your recipe right now. Please try again in a few moments." :  "You don’t have permission to access this." //Usuario sin permiso - Mostrar mensaje y quizás botón para volver al home.
    case 404: 
      return "The service is currently unavailable. Please try again later." //Ruta/API no encontrada - Mostrar en página actual, no redirigir.
    case 408: 
      return "The request timed out. Please check your connection and try again."
    case 429: 
    return "Too many requests. Please wait a moment and try again." //Límite de uso superado - Mostrar y desactivar botón por unos segundos.
    case 500: 
      return "Oops! Something went wrong on our side. Please try again later." //Error del servidor - Mostrar y dejar opción de reintentar.
    case 503: 
      return 	"Service temporarily unavailable. Please try again soon." //Servicio fuera de línea temporalmente
    default: 
      return "Unexpected error. Please try again later."
  }
}

//Extraer JSON  de la respuesta de la IA
export const getAIJson = (aiResponse : string ) : any => {
  const firstCurly = aiResponse.indexOf('{', 0)
  const lastCurly = aiResponse.lastIndexOf('}', aiResponse.length - 1)

  if(firstCurly === -1 || lastCurly === -1 || firstCurly > lastCurly) {
    throw new Error('No se encontró un objeto JSON válido en la respuesta de la IA.');
  }

  const jsonString = aiResponse.slice(firstCurly, lastCurly + 1)

  return jsonString
} 
