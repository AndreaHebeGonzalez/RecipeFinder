import { StateCreator } from "zustand";


export type utilsSliceTypes = {
  windowWidth: number,
  isLightMode: boolean,
  updateWindowWidth: (width : utilsSliceTypes['windowWidth']) => void
  toggleMode: () => void,
}

export const utilsSliceStore: StateCreator<utilsSliceTypes> = (set) => ({
  windowWidth: window.innerWidth,
  isLightMode: true,
  updateWindowWidth: (width) => {
    set({
      windowWidth: width
    })
  },
  toggleMode: () => {
    set((state) => ({
      isLightMode: state.isLightMode ? false : true
    }))
  }
})