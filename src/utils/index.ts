import { filters } from "../data";
import { RecipeCard, RecipeCardList, FilterCardsName, RecipesWithMetrics, RecipeDetailSubset, RecipeDetails } from "../types";

export const getHeight = (element: HTMLElement | null) => {
    if (!element) return 0;
    //const rect = element.getBoundingClientRect()
    const height = element.scrollHeight //rect.height;
    return height //parseFloat(height.toFixed(2))
}

export const getPadding = (element: HTMLElement | null) => {
    if (!element) return 0;
    const style = window.getComputedStyle(element);
    return parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
    
};

export const getGap = (element: HTMLElement | null) => {
    if(!element) return 0
    const style = window.getComputedStyle(element)
    return parseFloat(style.rowGap)
}

export const getRecipeFilterValues = (recipe : RecipeCard) : { [key in FilterCardsName] : number } => {
    const filtersKey = (Object.keys(filters) as Array<FilterCardsName>)
    const recipeFilterValues = filtersKey.reduce((acc, filter) => {
        if(filter === "readyInMinutes" || filter === "healthScore") {
            acc[filter] = recipe[filter]
        } else {
            const nutrient = recipe.nutrition?.nutrients?.find(nutrient => nutrient.name === filter)
            acc[filter] = nutrient ? nutrient.amount : 0
        }
        return acc
    }, {} as { [key in FilterCardsName] : number })
    return recipeFilterValues
}

export const getRecipesFiltersValues = (recipes : RecipeCardList) : RecipesWithMetrics[] => {
    const recipesLWithMetrics = recipes.map(recipe => ({
        recipe,
        metrics: getRecipeFilterValues(recipe)
    }))
    return recipesLWithMetrics
}


export const getRecipeFormat = (recipe : RecipeCard, recipeDetailSubset : RecipeDetailSubset ) : RecipeDetails => {
    const recipeDetails = {
    ...recipe,
    ...recipeDetailSubset
    }
    console.log(recipeDetails)
    return recipeDetails
}