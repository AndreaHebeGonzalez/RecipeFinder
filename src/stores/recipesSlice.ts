import { StateCreator } from "zustand"
import { getState } from "./useAppStore";
import { recipeSearchFetch, getRecipeDetailSubset } from "../service/recipeServices"
import type { QueryFilters, SearchFilterType, Filters, RecipeCardList, RecipeCard, RangesType, RecipeDetails, RecipeDetailSubset } from "../types"
import { buildRecipeParams } from "../service/apiParams";
import { getRecipeFormat } from "../utils";


export type RecipeSliceType = {
  recipes: RecipeCardList,
  recipeDetails: RecipeDetails,
  hasRecipe: boolean,
  filtersValues: RangesType,
  isLoading : boolean,
  searchRecipes: (searchFilter : SearchFilterType) => Promise<void>,
  setFiltersValues: (filtersValues : RangesType) => void,
  selectRecipe: (recipe: RecipeCard) => Promise<void>,
}

export const recipeSlice : StateCreator<RecipeSliceType> = (set, get) => {

  let lastSearch :  RecipeCardList = []
  let hasRecipeInitial = false
  
  const storedLastSearch = localStorage.getItem('lastSearch')
  if(storedLastSearch) {
    lastSearch = JSON.parse(storedLastSearch)
    hasRecipeInitial = true
  }
  
  return {
    recipes: lastSearch,
    recipeDetails: {} as RecipeDetails,
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
    },

    selectRecipe: async(recipe: RecipeCard) => {
      console.log('haciendo consulta')
      const recipeDetailSubset : RecipeDetailSubset = await getRecipeDetailSubset(recipe.id)
      if(recipe && recipeDetailSubset) {
        const recipeDetails =  getRecipeFormat(recipe,  recipeDetailSubset)
        console.log(recipeDetails)
        set({
          recipeDetails
        })
      } 
    }
  }
}