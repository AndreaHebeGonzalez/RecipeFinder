import { create } from "zustand";
import { UtilsSliceTypes, utilsSliceStore } from "./utilsSlice"
import { createuserPreferencesSlice, UserPreferencesSliceType } from "./user/userPreferencesSlice"
import { modalSliceStore, ModalSliceType } from "./ui/modalSlice"
import { recipeSlice, RecipeSliceType } from "../features/recipes/store/recipesSlice"
import { createFavoriteSlice, FavoriteSliceType } from "../features/recipes/store/favoritesSlice"
import { createNotificationSlice, NotificationSliceType } from "./ui/notificationSlice"
import { createAISlice, AISlice } from "../features/ai/store/aiSlice";
import { creatorErrorSlice, ErrorSliceType } from "./errorSlice";


export const useAppStore = create<UtilsSliceTypes & UserPreferencesSliceType & ModalSliceType & RecipeSliceType & FavoriteSliceType & NotificationSliceType & AISlice & ErrorSliceType>(
  (...a) => ({
    ...utilsSliceStore(...a),
    ...createuserPreferencesSlice(...a),
    ...modalSliceStore(...a),
    ...recipeSlice(...a),
    ...createFavoriteSlice(...a),
    ...createNotificationSlice(...a),
    ...createAISlice(...a),
    ...creatorErrorSlice(...a)
  })
)

export const { getState } = useAppStore; 

