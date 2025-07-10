import styles from './AiForm.module.scss'

type AIErrorType = {
  message: string
}

const AIError = ({ message } : AIErrorType ) => {

  console.log('se renderizo')

  return (
    <div className={styles.aiErrorWrapper}>
      <div className={styles.aiErrorBox}>
        <div className={styles.aiErrorIcon}>
          <img src="/icons/ai-alert.png" alt="AI warning icon" />
        </div>
        <p>{message}</p>
        <div className={styles.aiImage}>
          <img src="/public/images/IA/image-ai-error.png" alt="Confused AI character due to unrecognized ingredients" />
        </div>
      </div>
    </div>
    
  )
}

export default AIError