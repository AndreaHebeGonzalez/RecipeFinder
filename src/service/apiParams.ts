import type { QueryFilters, Filters } from "../types" 

export const buildRecipeParams = (filters : QueryFilters) : Filters => {
  const filtersClean = Object.fromEntries(
    Object.entries(filters).filter(([_, value])=> value.trim() !== ''))
  return filtersClean
}


