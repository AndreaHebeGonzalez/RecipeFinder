import styles from './ButtonSecondary.module.scss'


type ButtonSecondaryProps = {
  text: string
}

const ButtonSecondary = ({ text } : ButtonSecondaryProps) => {
  return (
    <button className={styles.btnSecondary}>
      { text }
    </button>
  )
}

export default ButtonSecondary