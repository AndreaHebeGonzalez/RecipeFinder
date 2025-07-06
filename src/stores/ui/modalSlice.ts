import { ReactNode, RefObject } from "react";
import { StateCreator } from "zustand";
import { modalOpenAnimation , modalCloseAnimation } from "../../animations";

export type ModalSliceType = {
  isModalOpen: boolean,
  modalRef: RefObject<HTMLDivElement | null> | null,
  setModalRef: (ref : RefObject<HTMLDivElement | null>) => void
  modalContent: ReactNode,
  modalTitle: string,
  openModal: (content: ReactNode, title: string) => void,
  closeModal: () => void
}


export const modalSliceStore : StateCreator<ModalSliceType> = (set, get) => ({
  isModalOpen: false,
  modalRef: null,
  setModalRef: (ref) => {
    set({
      modalRef: ref
    })
  },
  modalContent: null,
  modalTitle: '',
  openModal: (content: ReactNode, title: string) => {
    set({
      modalContent: content,
      modalTitle: title
    })
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
    setTimeout(() => {
      set({
        modalTitle:'',
        modalContent: null
      })
    }, 500);
  }
}) 