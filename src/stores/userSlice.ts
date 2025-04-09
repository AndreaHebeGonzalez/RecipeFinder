import { StateCreator } from "zustand";
import { preferencesSearchType } from "../types";
import { getState } from "./useAppStore";


export type userSliceType = {
  userPreferences: preferencesSearchType,
  handleSavePreferences: (preferences : preferencesSearchType) => void,
  preferencesExist: () => boolean,
  loadFromStorage: () => void
}

export const userSliceStore : StateCreator<userSliceType> = (set, get) => ({
  userPreferences: {} as preferencesSearchType,
  
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