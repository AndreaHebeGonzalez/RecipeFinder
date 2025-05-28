import { useEffect, useRef } from 'react'
import { useAppStore } from '../../stores/useAppStore'
import styles from './Notification.module.scss'
import { progressBarNotification } from '../../animations'


const Notification = () => {

  const { isError, message, showNotification, closeNotification } = useAppStore()

  const progressBarRef = useRef<HTMLDivElement | null>(null)
  const notificationBoxRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if(showNotification) {
      if(progressBarRef.current && notificationBoxRef.current) {
        progressBarNotification(notificationBoxRef.current, progressBarRef.current, closeNotification, isError)
      }
    }
  }, [showNotification])
  

  return (
    <div ref={notificationBoxRef} className={styles.notificationWrap}>
      <div className={styles.notification}>
        <img src={isError ? "/icons/wavy-warning-icon.svg":"/icons/wavy-check-icon.svg"} alt="Error in the input" />
        <p>
          {message}
        </p>
      </div>
      <div ref={progressBarRef} className={`${styles.progressBar} ${isError ? styles.error : styles.check}`}></div>
    </div>
  )
}

export default Notification