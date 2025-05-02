
import { StateCreator } from "zustand"
import { getState } from "./useAppStore";
import { recipeSearchFetch } from "../service/recipeServices"
import type { QueryFilters, SearchFilterType, Filters, RecipeCardList} from "../types"
import { buildRecipeParams } from "../service/apiParams";


export type RecipeSliceType = {
  recipes: RecipeCardList,
  hasRecipe: boolean,
  //lastSearch: RecipeCardList,
  searchRecipes: (searchFilter : SearchFilterType) => Promise<void>
  
}

export const recipeSlice : StateCreator<RecipeSliceType> = (set) => {

  let lastSearch :  RecipeCardList = []
  let hasRecipeInitial = false

  const storedLastSearch = localStorage.getItem('lastSearch')
  if(storedLastSearch) {
    lastSearch = JSON.parse(storedLastSearch)
    hasRecipeInitial = true
  }
  
  return {
    recipes: lastSearch,
    //lastSearch: lastSearch,
    hasRecipe: hasRecipeInitial,
    searchRecipes: async(searchFilter : SearchFilterType) => {
      const queryFilters : QueryFilters = {
        ...getState().userPreferences,
        ...searchFilter
      }  
      const filters : Filters = buildRecipeParams(queryFilters)
      const recipes = await recipeSearchFetch(filters)
      if(!recipes) throw new Error('Not rescipes')
      set({
        recipes,
        hasRecipe: true
      })
      localStorage.setItem('lastSearch', JSON.stringify(recipes))
    }
  }
}