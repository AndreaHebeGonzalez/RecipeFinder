import { StateCreator } from "zustand";
import { PreferencesSearchType } from "../types";
import { getState } from "./useAppStore";


export type UserPreferencesSliceType = {
  userPreferences: PreferencesSearchType,
  handleSavePreferences: (preferences : PreferencesSearchType) => void,
  preferencesExist: () => boolean,
  loadFromStorage: () => void
}

export const userPreferencesSlice : StateCreator<UserPreferencesSliceType> = (set, get) => {

  let storedPreferences : PreferencesSearchType = {
    diet: '',
    intolerances: ''
  }

  const fromStorage = localStorage.getItem('userPreferences')
  if(fromStorage) {
    storedPreferences = JSON.parse(fromStorage)
  }

  return {

    userPreferences: storedPreferences,
    
    handleSavePreferences: (userPreferences) => {
      set({
        userPreferences
      })
      localStorage.setItem('userPreferences', JSON.stringify(get().userPreferences)) 
      getState().closeModal()
    },

    preferencesExist: () => {
      return Object.keys(get().userPreferences).length !== 0 ? true : false
    },

    loadFromStorage: () => {
      let storedPreferences = localStorage.getItem('userPreferences')
      if(storedPreferences) {
        set({
          userPreferences: JSON.parse(storedPreferences)
        })
      }
    }
  }
}
  
  
  