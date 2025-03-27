import styles from './ButtonPrimary.module.scss'


type ButtonPrimaryProps = {
  text: string
}

const ButtonPrimary = ({ text } : ButtonPrimaryProps) => {
  return (
    <button className={styles.btnPrimary}>
      { text }
    </button>
  )
}

export default ButtonPrimary