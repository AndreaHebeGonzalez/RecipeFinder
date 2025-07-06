import { Outlet } from "react-router-dom"
import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import useWindowWidth from "../hooks/useWindowWidth"
import Modal from "../components/Modal/Modal"
import AppNotification from "../components/Notification/AppNotification"
import { useAppStore } from "../stores/useAppStore"

const Layout = () => {

  useWindowWidth();

  const showNotification = useAppStore(state=> state.showNotification)

  return (
    <> 
      <Header />
      <main>
        { showNotification && <AppNotification /> }
        <Modal />
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout