import { create } from "zustand";
import { UtilsSliceTypes, utilsSliceStore } from "./utilsSlice";
import { userPreferencesSlice, UserPreferencesSliceType } from "./userPreferencesSlice";
import { modalSliceStore, ModalSliceType } from "./modalSlice";
import { recipeSlice, RecipeSliceType } from "./recipesSlice";
import { createFavoriteSlice, FavoriteSliceType } from "./favoritesSlice";


export const useAppStore = create<UtilsSliceTypes & UserPreferencesSliceType & ModalSliceType & RecipeSliceType & FavoriteSliceType>(
  (...a) => ({
    ...utilsSliceStore(...a),
    ...userPreferencesSlice(...a),
    ...modalSliceStore(...a),
    ...recipeSlice(...a),
    ...createFavoriteSlice(...a)
  })
)

export const { getState } = useAppStore; 

