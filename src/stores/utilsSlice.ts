import { StateCreator } from "zustand";


export type utilsSliceTypes = {
  windowWidth: number,
  isLightMode: boolean,
  isMobile: boolean,
  updateWindowWidth: (width : utilsSliceTypes['windowWidth']) => void,
  getIsMobile: (isMobile: boolean) => void,
  toggleMode: () => void,
}

export const utilsSliceStore: StateCreator<utilsSliceTypes> = (set) => ({
  windowWidth: window.innerWidth,
  isLightMode: true,
  isMobile: window.innerWidth < 1024,
  updateWindowWidth: (width) => {
    set({
      windowWidth: width
    })
  },
  toggleMode: () => {
    set((state) => ({
      isLightMode: state.isLightMode ? false : true
    }))
  },
  getIsMobile: (isMobile) => {
    set({
      isMobile
    })
  }
})