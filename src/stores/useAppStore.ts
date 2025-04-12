import { create } from "zustand";
import { UtilsSliceTypes, utilsSliceStore } from "./utilsSlice";
import { userPreferencesSlice, UserPreferencesSliceType } from "./userPreferencesSlice";
import { modalSliceStore, ModalSliceType } from "./modalSlice";

export const useAppStore = create<UtilsSliceTypes & UserPreferencesSliceType & ModalSliceType>(
  (...a) => ({
    ...utilsSliceStore(...a),
    ...userPreferencesSlice(...a),
    ...modalSliceStore(...a),
  })
)

export const { getState } = useAppStore; 