import styles from './SecondaryButton.module.scss'


type SecondaryButtonProps = {
  text: string
}

const SecondaryButton = ({ text } : SecondaryButtonProps) => {
  return (
    <button className={styles.btnSecondary}>
      { text }
    </button>
  )
}

export default SecondaryButton