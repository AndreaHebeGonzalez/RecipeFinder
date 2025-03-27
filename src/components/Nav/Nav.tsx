
import { HomeIcon, BookmarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom'
import styles from './Nav.module.scss'
import { useRef, useState, useLayoutEffect } from 'react';
import { getHeight } from '../../utils';


type NavProps = {
  isMobile: boolean,
  openMenu : boolean
}

const Nav = ({ openMenu, isMobile } : NavProps) => {

  const navRef = useRef<HTMLElement | null>(null)
  
  const [heightNav, setHeightNav] = useState<number>(0)

  useLayoutEffect(() => {
    if(!isMobile) return
    if(navRef.current) {
      setHeightNav(getHeight(navRef.current))
    }
  }, [isMobile])
  
  
  useLayoutEffect(() => {
    if (!navRef.current) return;
    if(isMobile) {
      navRef.current.style.height = openMenu ? `${heightNav}px`: `0px`
    } else {
      navRef.current!.style.height = '';
    }
  }, [openMenu, isMobile])
  
  
  return (
    <nav ref={navRef}  className={`${styles.nav} ${isMobile ? styles.dropdownMenu:''}`} role="navigation">
      <ul className={styles.navItems}>
        <li className={styles.navItem}>
          <HomeIcon className='icon-size' />
          <Link to= {'/'}>
            Home
          </Link> 
        </li>
        <li className={styles.navItem}>
          <BookmarkIcon className='icon-size'/>
          <Link to= {'/favorites'}>
            Favorites
          </Link> 
        </li>
      </ul>
    </nav>
  )
}

export default Nav