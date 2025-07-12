import { StateCreator } from "zustand"
import { getState } from "../../../stores/useAppStore"
import { recipeSearchFetch } from "../services/recipeServices"
import type { QueryFilters, SearchFilterType, Filters, RecipeCardList, RangesType } from "../types"
import { buildRecipeParams } from "../utils"


export type RecipeSliceType = {
  recipes: RecipeCardList,
  hasResponse: boolean,
  searchRecipeError: {
    hasError: boolean,
    message: string
  },
  filtersValues: RangesType,
  isLoading : boolean,
  searchByName: boolean,
  searchRecipes: (searchFilter : SearchFilterType) => Promise<void>,
  setFiltersValues: (filtersValues : RangesType) => void,
  resetFilters: () => void,
  enableNameSearch: () => void,
  disableNameSearch: () => void,
}

export const recipeSlice : StateCreator<RecipeSliceType> = (set, get) => {

  
  return {
    recipes: [], 
    hasResponse: false,
    searchRecipeError: {
      hasError: false,
      message: ''
    },
    filtersValues: {} as RangesType,
    isLoading: false,
    searchByName: false,

    setFiltersValues: (filterValues : RangesType) => { 
      console.log('desde el slice recipe', filterValues)
      set({
        filtersValues: {
          ...get().filtersValues,
          ...filterValues
        }
      })
    },

    resetFilters: () => {
      set({
        filtersValues: {} as RangesType
      })
    },

    searchRecipes: async(searchFilter : SearchFilterType) => {
      try {
        set({
          recipes:[],
          hasResponse: false,
          isLoading: true,
          searchRecipeError: {
            hasError: false,
            message: ''
          },
        })
      
        const queryFilters : QueryFilters = {
          ...getState().userPreferences,
          ...searchFilter
        }  
        
        const filters : Filters = buildRecipeParams(queryFilters)

        const recipes = await recipeSearchFetch(filters)

        if(!recipes) throw new Error('Not rescipes')

        if(recipes.length === 0) {
          set({
            isLoading: false,
            hasResponse: true,
            searchRecipeError: {
              hasError: true,
              message: 'Oops! No results. Try different filters or ingredients.'
            },
          })
        } else {
          set({
            isLoading: false,
            recipes,
            hasResponse: true
          })
        }
        /* localStorage.setItem('lastSearch', JSON.stringify(recipes))  */
      } catch (error : unknown) {
        console.log(error)
      }
    },

    enableNameSearch: () => {
      set({
        searchByName: true,
      })
    },
    
    disableNameSearch: () => {
      set({
        searchByName: false,
      })
    }
  }
}