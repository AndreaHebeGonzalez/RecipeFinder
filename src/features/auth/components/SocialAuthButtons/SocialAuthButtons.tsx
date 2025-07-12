import ButtonWithIcon from '../../../../components/ui/Buttons/ButtonWithIcon'
import styles from './SocialAuthButtons.module.scss'

type SocialAuthButtonsType = {
  mode: 'login' | 'register'
}

const SocialAuthButtons = ({ mode } : SocialAuthButtonsType) => {

  const handleFacebook = () => {
    if(mode === 'login') {
      console.log('Login with Facebook')
    } else if(mode === 'register') {
      console.log('Register with Facebook')
    }
  }

  const handleGoogle = () => {
    if(mode === 'login') {
      console.log('Login with Google')
    } else if(mode === 'register') {
      console.log('Register with Google')
    }
  }

  return (
    <div className={styles.buttonLoginWrapper}>
        <ButtonWithIcon 
          type='button'
          label = 'Login with Facebook'
          icon = '/icons/facebook.svg'
          variant='facebook'
          onClick={handleFacebook}
        />
        <ButtonWithIcon 
          type='button'
          label = 'Login with Google'
          icon = '/icons/google.svg'
          variant='google'
          onClick={handleGoogle}
        />
      </div>
  )
}

export default SocialAuthButtons