import { RefObject } from "react";
import { StateCreator } from "zustand";
import { modalOpenAnimation , modalCloseAnimation } from "../animations";

 export type ModalSliceType = {
  modalRef: RefObject<HTMLDivElement | null> | null,
  setModalRef: (ref : RefObject<HTMLDivElement | null>) => void
  openModal: () => void,
  closeModal: () => void
}


export const modalSliceStore : StateCreator<ModalSliceType> = (set, get) => ({
  modalRef: null,
  setModalRef: (ref) => {
    set({
      modalRef: ref
    })
  },
  openModal: () => {
    const ref = get().modalRef
    if(ref && ref.current) {
      modalOpenAnimation(ref.current)
    }
    
  },
  closeModal: () => {
    const ref = get().modalRef
    if(ref && ref.current) {
      modalCloseAnimation(ref.current)
    }
  }
}) 