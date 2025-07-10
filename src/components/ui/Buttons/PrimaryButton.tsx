import styles from './PrimaryButton.module.scss'


type PrimaryButtonProps = {
  text: string
  type?: 'button'
  onClick?: () => void
}

const PrimaryButton = ({ text, type, onClick } : PrimaryButtonProps) => {
  return (
    <button className={styles.primaryBtn} {...(onClick && { onClick })} {...(type && { type })}>
      { text }
    </button>
  )
}

export default PrimaryButton