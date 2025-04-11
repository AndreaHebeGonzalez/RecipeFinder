import { create } from "zustand";
import { UtilsSliceTypes, utilsSliceStore } from "./utilsSlice";
import { userSliceStore, UserSliceType } from "./userSlice";
import { modalSliceStore, ModalSliceType } from "./modalSlice";

export const useAppStore = create<UtilsSliceTypes & UserSliceType & ModalSliceType>((...a) => ({
  ...utilsSliceStore(...a),
  ...userSliceStore(...a),
  ...modalSliceStore(...a),
}))

export const { getState } = useAppStore; 