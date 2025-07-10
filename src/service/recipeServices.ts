import { api } from "../lib/axios";
import type { Filters, RecipeDetailSubset, RecipeCard } from "../types"
import { RecipeCardsListSchema, RecipeInformationSchema, RecipeInstructionsSchema } from "../schemas";


const apiKey = import.meta.env.VITE_API_KEY

if (!apiKey) {
  throw new Error("VITE_API_KEY is missing in your environment variables."); //evitar que la clave sea undefined y la request falle silenciosamente.
}

type ParamsType = Filters & { apiKey: string,  addRecipeNutrition: boolean }

const getParams = (filters : Filters) : ParamsType =>  {
  return ({
    ...filters,
    apiKey,
    addRecipeNutrition: true,
  })
}

export const recipeSearchFetch = async (filters : Filters) : Promise<RecipeCard[] | null | undefined> => {
  try {
    const params = getParams(filters)
    const url = 'complexSearch'
    const {data : { results } } = await api.get(url, { params })

    const result = RecipeCardsListSchema.safeParse(results)

    if(!result.success) {
      console.log('Validation failed:', result.error);
      throw new Error('Invalid response structure')
    }

    console.log(result.data)

    const data: RecipeCard[] = result.data.map(recipe => {
      let id = recipe.id
      id = id.toString()
      console.log(typeof id)
      return {
        ...recipe,
        id,
        nutrition: {
          nutrients: recipe.nutrition.nutrients.filter(n=>["Calories", "Protein", "Carbohydrates", "Fat", "Sodium", "Cholesterol"].includes(n.name))
        },
        categoryRecipe: "searchRecipe"
      }})
    
    console.log(data)
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
    const url = `${id}/information?apiKey=${apiKey}`
    const { data : recipeInformation }  = await api(url)
    const information = RecipeInformationSchema.safeParse(recipeInformation)

    if(!information.success) { 
      console.error('Validation failed:', information.error); //
      throw new Error('Invalid response structure')
    }

    /* Obtengo instrucciones de recetas */
    const urlApi = `${id}/analyzedInstructions?apiKey=${apiKey}`
    const { data : instructionsRecipe } = await api(urlApi) 

    const instructions = RecipeInstructionsSchema.safeParse(instructionsRecipe) 

    if(!instructions.success) {
      console.error('Validation filed: ', instructions.error)
      throw new Error('Invalid response structure')
    }

    recipeDetailsSubmit = {
      ...information.data,
      id: id.toString(),
      instructions: instructions.data
    }

    return recipeDetailsSubmit

  } catch (error) {
    console.log(error)
    throw error;
  }
}


