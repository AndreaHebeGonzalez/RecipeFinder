import axios from "axios"
import type { Filters } from "../types"


const urlBase = "https://api.spoonacular.com/recipes/complexSearch"
const appId : string = import.meta.env.VITE_API_KEY

if (!appId) {
  throw new Error("VITE_API_KEY is missing in your environment variables."); //evitar que la clave sea undefined y la request falle silenciosamente.
}

type ParamsType = Filters & { apiKey: string }

const getParams = (filters : Filters) : ParamsType =>  {
  return ({
    ...filters,
    apiKey: appId
  })
}

export const recipeSearchFetch = async (filters : Filters) => {
  try {
    const params = getParams(filters)
    const response = await axios.get(urlBase, { params })
    
    if(response) {
      console.log(response)
    }
  } catch (error) {
    console.log(error)
  }
}
