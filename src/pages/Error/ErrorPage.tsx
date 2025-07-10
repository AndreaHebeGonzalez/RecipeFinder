import AppError from "../../components/ui/Error/AppError/AppError"


const ErrorPage = () => {
  
  return (
    <div>
      <AppError
      appError = {
        {
          hasError: true,
          kind: 'unexpected',
          source: 'other',
          status: null,
          generalMessage: null,
          technicalMessage:  null,
        }
      }
      />
    </div>
  )
}

export default ErrorPage