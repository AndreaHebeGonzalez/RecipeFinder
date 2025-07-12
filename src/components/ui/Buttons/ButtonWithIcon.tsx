import styles from './ButtonWithIcon.module.scss'

type ButtonWithIconType = {
  label: string,
  type?: "submit" | "reset" | "button" 
  icon?: string
  onClick?: () => void
  variant: "facebook" | "google" 
}
const ButtonWithIcon = ({ label, type, icon, onClick, variant } : ButtonWithIconType) => {

  const variantClass = variant ? styles[variant] : '' //accedo dinámicamente a la propiedad del objeto styles que tenga este nombre

  return (
    <button className={`${styles.buttonWithIcon} ${variantClass}`} {...(type && { type })} {...(onClick && { onClick })}>
      
      {
        icon && 
        <img className={styles.icon} src={icon} alt="button icon" />
      }
      <span className={styles.label}>{label}</span>
    </button>
  )
}

export default ButtonWithIcon