import { Outlet, useLocation } from "react-router-dom"
import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import useWindowWidth from "../hooks/useWindowWidth"
import { useEffect } from "react"
import { useAppStore } from "../stores/useAppStore"




const Layout = () => {
  const loadFromStorage = useAppStore(state => state.loadFromStorage)
  const userPreferences =  useAppStore(state => state.userPreferences)

  useWindowWidth();
  const path = useLocation().pathname

  useEffect(() => {
    loadFromStorage()
  }, [])

  useEffect(() => {
    console.log(userPreferences)
  }, [userPreferences])
  

  return (
    <> 
      <Header />
      <main className={ path === '/' || path === '/favorites' ? `background-1`:''}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout