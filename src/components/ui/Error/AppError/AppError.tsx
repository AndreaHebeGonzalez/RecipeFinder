/* Componente para error de solicitudes */
import { AppErrorType } from '../../../../types'
import styles from './AppError.module.scss'



const AppError = ({ appError } : { appError: AppErrorType}) => {

  return (
    <div className={styles.errorPage}>
      <div className={styles.errorPageHeader}>
        {
          appError.status && appError.source === 'auth' ?
          <div className={styles.status}>
            <span>{appError.status}</span> 
            <span>Error</span>
          </div>
          :
          appError.source === 'ai' ? 

          <img className={styles.image} src="/public/icons/sad.png" alt="image error" loading="eager" /> 
          :
          <img className={styles.image} src="/public/images/errorPage.png" alt="image error"  loading="eager" /> 
        }
      </div>
      <div className={styles.messagesWrapper}>
        <div className={styles.messageBox}>
          <div className={styles.errorIcon}>
            <img src="/icons/error.png" alt="error icon" />
          </div>
          <div className={styles.message}>
            <p>
              {
                appError.generalMessage 
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppError