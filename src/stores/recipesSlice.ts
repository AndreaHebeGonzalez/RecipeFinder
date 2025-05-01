
import { StateCreator } from "zustand"
import { getState } from "./useAppStore";
import { recipeSearchFetch } from "../service/recipeServices"
import type { QueryFilters, SearchFilterType, Filters, RecipeCardList} from "../types"
import { buildRecipeParams } from "../service/apiParams";


export type RecipeSliceType = {
  recipes: RecipeCardList,
  searchRecipes: (searchFilter : SearchFilterType) => Promise<void>
}

export const recipeSlice : StateCreator<RecipeSliceType> = (set) => ({
  recipes: [],
  searchRecipes: async(searchFilter : SearchFilterType) => {
    const queryFilters : QueryFilters = {
      ...getState().userPreferences,
      ...searchFilter
    }  
    const filters : Filters = buildRecipeParams(queryFilters)
    const recipes = await recipeSearchFetch(filters)
    set({
      recipes
    })
  }
})