import styles from './PrimaryButton.module.scss'


type PrimaryButtonProps = {
  text: string
}

const PrimaryButton = ({ text } : PrimaryButtonProps) => {
  return (
    <button className={styles.btnPrimary}>
      { text }
    </button>
  )
}

export default PrimaryButton