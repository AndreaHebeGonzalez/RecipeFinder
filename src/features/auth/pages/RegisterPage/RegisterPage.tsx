import AuthLayout from '../../components/AuthLayout/AuthLayout'
import DividerWhithText from '../../components/DividirWithText/DividerWhithText'
import RegisterForm from '../../components/AuthForm/RegisterForm'
import SocialAuthButtons from '../../components/SocialAuthButtons/SocialAuthButtons'
import styles from '../../components/AuthLayout/AuthLayout.module.scss'


const RegisterPage = () => {


  return (
    <AuthLayout 
      title= {
        <>
          Create your <span className={styles.brand}>NutriPlan </span>account
        </>
      }
    >
      <RegisterForm />
      <DividerWhithText />
      <SocialAuthButtons 
      mode= 'register'
      />
    </AuthLayout>
  )
}

export default RegisterPage