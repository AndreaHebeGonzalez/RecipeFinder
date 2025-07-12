import styles from './AuthLayout.module.scss'


type AuthLayoutProps  = {
  title: string,
  children: React.ReactNode
}

const AuthLayout = ({ title, children } : AuthLayoutProps ) => {


  return (
    <div className={styles.loginPage}>
      <img className={styles.bgImage} src="/public/images/ingredients-cut.png" alt="bg" />
      <div className={styles.loginBox}>
        <h3>{title}</h3>
        { children }
      </div>
    </div>
  )
}

export default AuthLayout