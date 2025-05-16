import axios from "axios"
import type { Filters, RecipeDetailSubset, RecipeCard } from "../types"
import { RecipeCardsListSchema, RecipeInformationSchema, RecipeInstructionsSchema } from "../schemas";



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

    console.log(results)

    const result = RecipeCardsListSchema.safeParse(results)

    if(!result.success) {
      console.log('Validation failed:', result.error);
      throw new Error('Invalid response structure')
    }

    console.log(result.data)

    const data = result.data.map(recipe => (
      {
        ...recipe,
        nutrition: {
          nutrients: recipe.nutrition.nutrients.filter(n=>["Calories", "Protein", "Carbohydrates", "Fat", "Sodium", "Cholesterol"].includes(n.name))
        }
      }
    ))
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getRecipeDetailSubset = async(recipe : RecipeCard) : Promise<RecipeDetailSubset> =>  {
  try {
    let recipeDetailsSubmit = {} as RecipeDetailSubset
    const id = recipe.id

    /* Obtengo informacion de recetas */

    const { data : recipeInformation }  = await axios(`${urlBase}${id}/information?apiKey=${appId}`)
    const information = RecipeInformationSchema.safeParse(recipeInformation)

    if(!information.success) { 
      console.error('Validation failed:', information.error); //
      throw new Error('Invalid response structure')
    }

    /* Obtengo instrucciones de recetas */

    const { data : instructionsRecipe } = await axios(`${urlBase}${id}/analyzedInstructions?apiKey=${appId}`) 

    const instructions = RecipeInstructionsSchema.safeParse(instructionsRecipe) 

    if(!instructions.success) {
      console.error('Validation filed: ', instructions.error)
      throw new Error('Invalid response structure')
    }

    recipeDetailsSubmit = {
      ...information.data,
      instructions: instructions.data
    }

    console.log(recipeDetailsSubmit)

    return recipeDetailsSubmit

  } catch (error) {
    console.log(error)
    throw error;
  }
}


