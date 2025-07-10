/* Componente para error de formulario */

import styles from './FormError.module.scss'

type FormError = {
  message: string
}

const FormError = ({ message } : FormError) => {
  return (
    <div className={styles.formError}>
      <p>{message}</p>
    </div>
  )
}

export default FormError