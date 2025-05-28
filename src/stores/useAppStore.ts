import { create } from "zustand";
import { UtilsSliceTypes, utilsSliceStore } from "./utilsSlice";
import { userPreferencesSlice, UserPreferencesSliceType } from "./userPreferencesSlice";
import { modalSliceStore, ModalSliceType } from "./modalSlice";
import { recipeSlice, RecipeSliceType } from "./recipesSlice";
import { createFavoriteSlice, FavoriteSliceType } from "./favoritesSlice";
import { createNotificationSlice, NotificationSliceType } from "./notificationSlice";


export const useAppStore = create<UtilsSliceTypes & UserPreferencesSliceType & ModalSliceType & RecipeSliceType & FavoriteSliceType & NotificationSliceType>(
  (...a) => ({
    ...utilsSliceStore(...a),
    ...userPreferencesSlice(...a),
    ...modalSliceStore(...a),
    ...recipeSlice(...a),
    ...createFavoriteSlice(...a),
    ...createNotificationSlice(...a)
  })
)

export const { getState } = useAppStore; 

