import AuthLayout from '../../components/AuthLayout/AuthLayout'
import DividerWhithText from '../../components/DividirWithText/DividerWhithText'
import RegisterForm from '../../components/RegisterForm/RegisterForm'
import SocialAuthButtons from '../../components/SocialAuthButtons/SocialAuthButtons'


const RegisterPage = () => {


  return (
    <AuthLayout title='Register'>
      <RegisterForm />
      <DividerWhithText />
      <SocialAuthButtons 
      mode= 'register'
      />
    </AuthLayout>
  )
}

export default RegisterPage