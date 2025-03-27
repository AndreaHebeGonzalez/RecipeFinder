import { create } from "zustand";
import { utilsSliceTypes, utilsSliceStore } from "./utilsSlice";


export const useAppStore = create<utilsSliceTypes>((...a) => ({
  ...utilsSliceStore(...a)
}))