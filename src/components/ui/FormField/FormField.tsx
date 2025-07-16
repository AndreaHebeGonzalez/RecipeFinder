import { forwardRef, InputHTMLAttributes } from 'react'
import styles from './FormField.module.scss'
import FormError from '../Error/FormError/FormError'


type FormFieldType = {
  label: string,
  id: string,
  error?: string
} & InputHTMLAttributes<HTMLInputElement>

const FormField = forwardRef<HTMLInputElement, FormFieldType>(
  
  ({ label, id, name, type, error, ...props}, ref ) => {


    return (
      <div className={styles.fieldBox}>
        <label htmlFor="username">
          {label}
        </label>
        <input 
          id={id}
          type={type} 
          name={name}
          ref={ref}
          {...props}
        />
        {
          error && <FormError message={error} />
        }
        
      </div>
    )
  }
)
export default FormField