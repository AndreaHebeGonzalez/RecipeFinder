import axios from "axios";
import { StateCreator } from "zustand";
import { getState } from "../useAppStore";
import { generateRecipe } from "../../service/aiServices";
import { AIRecipe, AIRequest, ErrorKind } from "../../types";
import { getMessageError } from "../../utils";


export type AISlice = {
  aiTags : AIRequest | null
  aiRecipe: AIRecipe | null,
  aiIsLoading: boolean,
  hasRequestError: boolean, //flag local de que hubo error técnico en generación de receta IA 
  tagError: {
    hasErrorTag: boolean,
    message: string | null
  }
  setAITags: (aiTags : AIRequest) => void
  generateRecipe: (data : AIRequest) => Promise<void>,
  getRecipeImage: (title: string) => Promise<void>
}

export const createAISlice : StateCreator<AISlice> = (set) => ({
  aiTags : null,
  aiRecipe: null,
  aiIsLoading: false,
  hasRequestError: false,
  tagError: {
    hasErrorTag: false,
    message: null,
  },
  setAITags: (aiTags) => {
    set({
      aiTags
    })
  },
  generateRecipe: async(data : AIRequest) => {
    getState().resetAppError()
    set({
      aiRecipe: null,
      aiIsLoading: true,
      hasRequestError: false,
      tagError: {
        hasErrorTag: false,
        message: null
      }
    })
    
    try {
      const response = await generateRecipe(data.input)

      if(!response?.sucess) {
        if(response?.tagError) {
          set({
            aiIsLoading: false,
            tagError: {
              hasErrorTag: true,
              message: response.error
            }
          })
          
        } else if(response?.tagError === false) {
          getState().setAppError(response?.errorKind, 'ai', response?.error, response?.technicalMessage)
          set({
            aiIsLoading: false,
            hasRequestError: true,
          })
        }
        
      } else {
        set({
          aiRecipe: response.data,
        })
        setTimeout(() => {
          set({
            aiIsLoading: false,
          })
        }, 200);
      }
    } catch (err) {
      if(axios.isAxiosError(err)) { //Errores de peticion
        const status : number | null = err.response?.status ?? null
        const technicalMessage : string = err.response?.data?.message ?? err.message ?? 'Unexpected error occurred'
        
        console.error("Network or API error (Axios):", status , technicalMessage, err.response?.data) 

        let errorKind: ErrorKind = 'unexpected'

        if(!err.response) { // Si no hubo una respuesta 
          errorKind = 'network' 
          getState().setAppError(errorKind, 'ai', technicalMessage, "We couldn’t connect to the server. Please check your internet connection and try again.")
          set({
            hasRequestError: true,
            aiIsLoading: false,
          })
          
        } else if(status) {
          const generalMessage = getMessageError(status, false) //Solo enviamos true si el error se genera desde la autentucacion del usuario
          if (status === 401 || status === 403) {
            errorKind = 'apiAuth'
          } else if (status !== null && status >= 400 && status < 600) { 
            errorKind = 'http'
          } else {
            errorKind = 'unexpected'
          }
          getState().setAppError(errorKind, 'ai', generalMessage, technicalMessage, status)
          set({
            hasRequestError: true,
            aiIsLoading: false,
          })
        } else { // *
          getState().setAppError(errorKind, 'ai', technicalMessage, "We couldn’t process your request due to an unexpected issue. Please try again.")
          set({
            hasRequestError: true,
            aiIsLoading: false,
          })
        }
      }  else {
        console.error("Error inesperado:", err) 
        getState().setAppError('unexpected', 'ai', 'Oops! Something went wrong. Please try again later.', 'Unexpected error occurred')
        set({
          hasRequestError: true,
          aiIsLoading: false,
        })
      } 
    }
  },
  getRecipeImage: async (title) => {

  }
})


/* 
// *
Si hay err.response pero status es undefined o null, no deberías tratarlo como un error HTTP, porque no podés clasificarlo correctamente. Es un caso raro pero puede suceder en:

Proxies mal configurados

Respuestas sin cabecera status

Bugs del backend o del gateway

Errores donde Axios sí tiene .response pero el objeto está incompleto

*/