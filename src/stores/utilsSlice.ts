import { StateCreator } from "zustand";


export type UtilsSliceTypes = {
  windowWidth: number,
  isLightMode: boolean,
  isTablet: boolean,
  updateWindowWidth: (width : UtilsSliceTypes['windowWidth']) => void,
  getIsTablet: (isTablet: boolean) => void,
  toggleMode: () => void,
}

export const utilsSliceStore: StateCreator<UtilsSliceTypes> = (set) => ({
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