import { useMemo, useState } from 'react'
import Nav from "../Nav/Nav"
import styles from "./Header.module.scss"
import { useAppStore } from '../../stores/useAppStore'



const Header = () => {

  const [openMenu, setOpenMenu] = useState(false)

  const windowWidth = useAppStore(state => state.windowWidth)

  const isMobile = useMemo(() => windowWidth < 1024, [windowWidth])

  const handleClick = () => {
    setOpenMenu(!openMenu)
  }
  
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.flexHeader}>
          <div className={styles.logoWrapper}>
            <div>
              <img src="/images/logoRecipeFinder.png" alt="logo" />
            </div>
            <h1>RecipeFinder</h1>
          </div>

          <div className={styles.navWrapper}>

            {isMobile && <img onClick = {handleClick} className={`icon-size ${styles.menuMobile}`} src="/icons/menu-icon.svg" alt="menu mobile" />}
            
            <Nav 
              isMobile = {isMobile }
              openMenu = { openMenu }
            />

            <div className={styles.user}>
              <img src="/icons/user-solid-icon.svg" alt="Go to profile" />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header