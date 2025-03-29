import { useEffect } from "react";
import { useAppStore } from "../stores/useAppStore";



const useWindowWidth = () => {
  const updateWindowWidth = useAppStore(state => state.updateWindowWidth)
  const getIsTablet = useAppStore(state=>state.getIsTablet)

  useEffect(() => {
    const handleGetWindowWidth = () => {
      updateWindowWidth(window.innerWidth)
      getIsTablet(window.innerWidth<1024)
    }
    window.addEventListener('resize', handleGetWindowWidth)
    return () => {
      window.removeEventListener('resize', handleGetWindowWidth)
    }
  }, [])
}

export default useWindowWidth