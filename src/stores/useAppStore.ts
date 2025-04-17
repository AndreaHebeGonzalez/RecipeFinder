import { create } from "zustand";
import { UtilsSliceTypes, utilsSliceStore } from "./utilsSlice";
import { userPreferencesSlice, UserPreferencesSliceType } from "./userPreferencesSlice";
import { modalSliceStore, ModalSliceType } from "./modalSlice";
import { recipeSlice, RecipeSliceType } from "./recipesSlice";

export const useAppStore = create<UtilsSliceTypes & UserPreferencesSliceType & ModalSliceType & RecipeSliceType>(
  (...a) => ({
    ...utilsSliceStore(...a),
    ...userPreferencesSlice(...a),
    ...modalSliceStore(...a),
    ...recipeSlice(...a)
  })
)

export const { getState } = useAppStore; 