import styles from './AuthLayout.module.scss'


type AuthLayoutProps  = {
  title: React.ReactNode,
  children: React.ReactNode
}

const AuthLayout = ({ title, children } : AuthLayoutProps ) => {

  


  return (
    <div className={styles.authPage}>
      <div className={styles.mainLayout}>
        <img className={styles.bgImage} src="/images/ingredients-cut.png" alt="bg" />
        <div className={styles.authBox}>
          <h3>{title}</h3>
          { children }
        </div>
      </div>
      
    </div>
  )
}

export default AuthLayout