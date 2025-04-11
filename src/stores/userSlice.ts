import { StateCreator } from "zustand";
import { PreferencesSearchType } from "../types";
import { getState } from "./useAppStore";


export type UserSliceType = {
  userPreferences: PreferencesSearchType,
  handleSavePreferences: (preferences : PreferencesSearchType) => void,
  preferencesExist: () => boolean,
  loadFromStorage: () => void
}

export const userSliceStore : StateCreator<UserSliceType> = (set, get) => ({
  userPreferences: {
    diets: [],
    allergies: []
  },
  
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
})