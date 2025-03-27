import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <footer className= {styles.footer}>
      <p>©</p>
      <span>|</span>
      <p>2025</p>
      <span>|</span>
      <p>RecipeFinder</p>
      <span>|</span>
      <p>Desarrollado por AG</p>
    </footer>
  )
}

export default Footer