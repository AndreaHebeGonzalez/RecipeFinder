import { z } from "zod"
import { aiIngredientsSchema, aiInstructionsSchema, RecipeAIErrorSchema, RecipeAISchema } from "../schemas"
import type { ErrorKind } from "../../../types"
/* AI Types */

export type AIRequest = {
  input : string
}

export type aiIngredients = z.infer<typeof aiIngredientsSchema>

export type aiInstructions = z.infer<typeof aiInstructionsSchema>

export type AIRecipe = z.infer<typeof RecipeAISchema> & {
  id: number | string,
  image: string,
  categoryRecipe : 'aiRecipe'
}

export type AIErrorRecipe = z.infer<typeof RecipeAIErrorSchema>


// Este error indica que la IA devolvió un error esperado por una mala entrada del usuario (por ej: ingredientes inválidos)
export type RecipeAIResponse = 
  | { sucess: true, data: AIRecipe }
  | { sucess: false, tagError: true, error: string }
  | { sucess: false, tagError: false, error: string, technicalMessage: string, errorKind: ErrorKind }


export type CustomRecipe = {
  title: string,
  id: number,
  instructions: string[],
  ingredients: string[],
  image: string
}