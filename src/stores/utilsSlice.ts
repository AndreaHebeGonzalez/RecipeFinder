import { StateCreator } from "zustand";


export type utilsSliceTypes = {
  windowWidth: number,
  isLightMode: boolean,
  isTablet: boolean,
  updateWindowWidth: (width : utilsSliceTypes['windowWidth']) => void,
  getIsTablet: (isTablet: boolean) => void,
  toggleMode: () => void,
}

export const utilsSliceStore: StateCreator<utilsSliceTypes> = (set) => ({
  windowWidth: window.innerWidth,
  isLightMode: true,
  isTablet: window.innerWidth < 1024,
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
  getIsTablet: (isTablet) => {
    set({
      isTablet
    })
  }
})