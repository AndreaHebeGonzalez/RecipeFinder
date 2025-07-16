import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form' 
import { zodResolver} from '@hookform/resolvers/zod'
import { RegisterFormData } from '../../types'
import { registerSchema } from '../../schemas/registerSchema.ts'
import styles from './AuthForm.module.scss'
import PrimaryButton from '../../../../components/ui/Buttons/PrimaryButton'
import FormField from '../../../../components/ui/FormField/FormField'



const RegisterForm = () => {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  })


  const onSubmit = (data: RegisterFormData) => {
    console.log("✅ Datos validados:", data)
  }


  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles.fieldsBox}>
        <div className={styles.fieldGroup}>
          <FormField 
            id='email'
            label='Email'
            placeholder='Please enter your email'
            type='email'
            {...register("email")}
            error={errors.email?.message}
          />
          <FormField 
            id='username'
            label='User name'
            placeholder='Enter your name'
            type='text'
            {...register("username")}
            error={errors.username?.message}
          />
        </div>
        <div className={styles.fieldGroup}>
          <FormField 
            label='Password'
            id='password'
            placeholder='Enter your password'
            type='password'
            {...register("password")}
            error={errors.password?.message}
          />
          <FormField 
            label='Repeat password'
            id='repeatpassword'
            placeholder='Enter again your password'
            type='password'
            {...register("repeatPassword")}
            error={errors.repeatPassword?.message}
          />
        </div>
      </div>
      <div className={styles.submitBox}>
        <PrimaryButton
          text='Login'
          type='submit'
        />
        <div className={styles.signUpBox}>
          <span className={styles.signUpText}>Already have an account?{' '} 
            <Link to={'/login'}>
              <span className={styles.ctaLink}>Login</span>
            </Link>
          </span>
        </div>
      </div>
    </form>
  )
}

export default RegisterForm