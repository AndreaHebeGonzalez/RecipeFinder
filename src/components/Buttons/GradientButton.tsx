import styles from './GradientButton.module.scss'


const GradientButton = ({ text } : { text: string }) => {
  return (
      <button className={styles.gradientButton}>
        { text }
      </button>
  )
}

export default GradientButton