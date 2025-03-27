import { useEffect } from "react";
import { useAppStore } from "../stores/useAppStore";



const useWindowWidth = () => {
  const updateWindowWidth = useAppStore(state => state.updateWindowWidth)

  useEffect(() => {
    const handleGetWindowWidth = () => {
      updateWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleGetWindowWidth)
    return () => {
      window.removeEventListener('resize', handleGetWindowWidth)
    }
  }, [])
}

export default useWindowWidth