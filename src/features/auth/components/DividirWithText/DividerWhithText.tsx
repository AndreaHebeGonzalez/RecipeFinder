import styles from './DividerWithText.module.scss'

const DividerWhithText = () => {
  return (
    <div className={styles.dividerWithText}>
      <div className={styles.dividerLine}></div>
      Or
      <div className={styles.dividerLine}></div>
    </div>
  )
}

export default DividerWhithText