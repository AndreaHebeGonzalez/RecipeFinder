import { useMemo, useState } from 'react'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import Nav from "../Nav/Nav"
import styles from "./Header.module.scss"
import { useAppStore } from '../../stores/useAppStore'



const Header = () => {

  const [openMenu, setOpenMenu] = useState(false)

  const windowWidth = useAppStore(state => state.windowWidth)
  const isLightMode = useAppStore(state => state.isLightMode)
  const toggleMode = useAppStore(state => state.toggleMode )

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
            
            <div className={styles.iconToggle} onClick={toggleMode}>
              {isLightMode ? 
                <SunIcon stroke= '#fff' className='icon-size-2' />
                : 
                <MoonIcon stroke= '#fff' className='icon-size-2' />
              }
            </div>
          </div>
          
        </div>
      </div>
    </header>
  )
}

export default Header