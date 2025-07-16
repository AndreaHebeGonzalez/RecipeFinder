import LoginForm from '../../components/AuthForm/LoginForm'
import AuthLayout from '../../components/AuthLayout/AuthLayout'
import DividerWhithText from '../../components/DividirWithText/DividerWhithText'
import SocialAuthButtons from '../../components/SocialAuthButtons/SocialAuthButtons'



const LoginPage = () => {

  return (
    <AuthLayout 
      title= {
        <>
          Login
        </>
      }
    >
      <LoginForm />
      <DividerWhithText />
      <SocialAuthButtons 
        mode='login'
      />
    </AuthLayout>
  )
}

export default LoginPage