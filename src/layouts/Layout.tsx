import { Outlet } from "react-router-dom"
import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import useWindowWidth from "../hooks/useWindowWidth"



const Layout = () => {
  useWindowWidth();

  return (
    <> 
      <Header />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout