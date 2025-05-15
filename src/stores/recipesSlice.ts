import { StateCreator } from "zustand"
import { getState } from "./useAppStore";
import { recipeSearchFetch } from "../service/recipeServices"
import type { QueryFilters, SearchFilterType, Filters, RecipeCardList, RangesType, RecipeDetails } from "../types"
import { buildRecipeParams } from "../service/apiParams";

export type RecipeSliceType = {
  recipes: RecipeCardList,
  recipeStored: RecipeDetails,
  hasRecipe: boolean,
  filtersValues: RangesType,
  isLoading : boolean,
  searchRecipes: (searchFilter : SearchFilterType) => Promise<void>,
  setFiltersValues: (filtersValues : RangesType) => void,
}

export const recipeSlice : StateCreator<RecipeSliceType> = (set, get) => {

  let lastSearch :  RecipeCardList = []
  let hasRecipeInitial = false

  /* inicializo recipeStored  */
  
  let recipeDetailsInitial = {} as RecipeDetails 

  const recipeDetailsStored = localStorage.getItem('recipeDetailsStored')
  if(recipeDetailsStored) {
    recipeDetailsInitial = JSON.parse(recipeDetailsStored)
  }

  /* ------ */

  const storedLastSearch = localStorage.getItem('lastSearch')
  if(storedLastSearch) {
    lastSearch = JSON.parse(storedLastSearch)
    hasRecipeInitial = true
  }
  
  return {
    recipes: lastSearch, 
    recipeStored: recipeDetailsInitial,
    hasRecipe: hasRecipeInitial,
    filtersValues: {} as RangesType,
    isLoading: false,
    setFiltersValues: (filterValues : RangesType) => { //define una función genérica
      set({
        filtersValues: {
          ...get().filtersValues,
          ...filterValues
        }
      })
    },
    searchRecipes: async(searchFilter : SearchFilterType) => {
      
      set({
        recipes:[],
        hasRecipe: false,
        isLoading: true
      })
      
      const queryFilters : QueryFilters = {
        ...getState().userPreferences,
        ...searchFilter
      }  
      
      const filters : Filters = buildRecipeParams(queryFilters)
      const recipes = await recipeSearchFetch(filters)
      
      if(!recipes) throw new Error('Not rescipes')

      setTimeout(() => {
        set({
          recipes,
          hasRecipe: true
        })
        localStorage.setItem('lastSearch', JSON.stringify(recipes)) 
        set({
          isLoading: false
        })
      }, 1000);
    }
  }
}