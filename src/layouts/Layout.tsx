import { Outlet, useLocation } from "react-router-dom"
import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import useWindowWidth from "../hooks/useWindowWidth"




const Layout = () => {

  useWindowWidth();
  const path = useLocation().pathname

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