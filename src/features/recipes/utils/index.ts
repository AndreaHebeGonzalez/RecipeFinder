import type { RecipeCard, FilterCardsName, RecipeWithMetrics, RecipeDetailSubset, RecipeDetails, QueryFilters, Filters } from "../types";
import type { AIRecipe } from "../../ai/types";
import { filters } from "../../../data";

export const buildRecipeParams = (filters : QueryFilters) : Filters => {
  const filtersClean = Object.fromEntries(
    Object.entries(filters).filter(([_, value])=> value.trim() !== ''))
  return filtersClean
}

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


