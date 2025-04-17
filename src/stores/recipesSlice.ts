
import { StateCreator } from "zustand"
import { getState } from "./useAppStore";
import { recipeSearchFetch } from "../service/recipeServices"
import type { QueryFilters, SearchFilterType, Filters} from "../types"
import { buildRecipeParams } from "../service/apiParams";


export type RecipeSliceType = {
  recipes: {},
  searchRecipes: (searchFilter : SearchFilterType) => Promise<void>
}

export const recipeSlice : StateCreator<RecipeSliceType> = () => ({
  recipes: {},

  searchRecipes: async(searchFilter : SearchFilterType) => {
    const queryFilters : QueryFilters = {
      ...getState().userPreferences,
      ...searchFilter
    }  
    const filters : Filters = buildRecipeParams(queryFilters)
    await recipeSearchFetch(filters)

  }
})