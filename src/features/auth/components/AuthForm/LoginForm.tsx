import styles from './AuthForm.module.scss'
import PrimaryButton from '../../../../components/ui/Buttons/PrimaryButton'
import FormField from '../../../../components/ui/FormField/FormField'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { LoginFormData } from '../../types'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '../../schemas/registerSchema.ts'



const LoginForm = () => {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = () => {
    console.log('Logica de login')
  }

  return (
    <form className={styles.form} onSubmit={() => handleSubmit(onSubmit)} noValidate>
      <div className={styles.fieldGroup}>
        <FormField 
          id='username'
          label='User name'
          placeholder='Enter your name'
          type='text'
          error={errors.username?.message}
          {...register('username')}
        />
        <FormField 
          label='Password'
          id='password'
          placeholder='Enter your password'
          type='password'
          error={errors.password?.message}
          {...register('password')}
        />
      </div>
      <div className={styles.recoveryBox}>
        <span className={styles.recoveryText}>Forgot password?</span>
      </div>
      <div className={styles.submitBox}>
        <PrimaryButton 
          text='Login'
          type='submit'
        />
        <div className={styles.signUpBox}>
          <span className={styles.signUpText}>Don’t have an account?{' '} 

            <Link to={'/register'}>
              <span className={styles.ctaLink}>Signup</span>
            </Link>
          </span>
        </div>
      </div>
    </form>
  )
}

export default LoginForm