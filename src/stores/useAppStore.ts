import { create } from "zustand";
import { utilsSliceTypes, utilsSliceStore } from "./utilsSlice";
import { userSliceStore, userSliceType } from "./userSlice";
import { modalSliceStore, modalSliceType } from "./modalSlice";

export const useAppStore = create<utilsSliceTypes & userSliceType & modalSliceType>((...a) => ({
  ...utilsSliceStore(...a),
  ...userSliceStore(...a),
  ...modalSliceStore(...a),
}))

export const { getState } = useAppStore; 