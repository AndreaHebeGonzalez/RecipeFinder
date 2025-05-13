import axios from "axios"
import type { Filters, RecipeDetailSubset } from "../types"
import { RecipeCardsListSchema, RecipeIngredientsSchema, RecipeInstructionsSchema } from "../schemas";



const urlBase = "https://api.spoonacular.com/recipes/"
const appId : string = import.meta.env.VITE_API_KEY

if (!appId) {
  throw new Error("VITE_API_KEY is missing in your environment variables."); //evitar que la clave sea undefined y la request falle silenciosamente.
}

type ParamsType = Filters & { apiKey: string,  addRecipeNutrition: boolean}

const getParams = (filters : Filters) : ParamsType =>  {
  return ({
    ...filters,
    apiKey: appId,
    addRecipeNutrition: true,
  })
}

export const recipeSearchFetch = async (filters : Filters) => {
  try {
    const params = getParams(filters)
    const {data : { results } } = await axios.get(`${urlBase}complexSearch`, { params })
    const result = RecipeCardsListSchema.safeParse(results)

    if(!result.success) {
      console.log('Validation failed:', result.error);
      throw new Error('Invalid response structure')
    }

    const data = result.data.map(recipe => (
      {
        ...recipe,
        nutrition: {
          nutrients: recipe.nutrition.nutrients.filter(n=>["Calories", "Protein", "Carbohydrates", "Fat"].includes(n.name))
        }
      }
    ))
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getRecipeDetailSubset = async(id: number) : Promise<RecipeDetailSubset> =>  {
  try {
    let recipeDetailsSubmit = {} as RecipeDetailSubset
    /* Obtengo ingredientes de recetas */
    const { data : ingredientsApi }  = await axios(`${urlBase}${id}/ingredientWidget.json?apiKey=${appId}`)
    const ingredients = RecipeIngredientsSchema.safeParse(ingredientsApi)

    if(!ingredients.success) { 
      console.error('Validation failed:', ingredients.error); //
      throw new Error('Invalid response structure')
    }

    /* Obtengo instrucciones de rectas */

    const { data : instructionsApi } = await axios(`https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${appId}`) 

    const instructions = RecipeInstructionsSchema.safeParse(instructionsApi) 

    if(!instructions.success) {
      console.error('Validation filed: ', instructions.error)
      throw new Error('Invalid response structure')
    }

    recipeDetailsSubmit = {
      ...ingredients.data,
      instructions: instructions.data
    }

    return recipeDetailsSubmit

  } catch (error) {
    console.log(error)
    throw error;
  }
}


