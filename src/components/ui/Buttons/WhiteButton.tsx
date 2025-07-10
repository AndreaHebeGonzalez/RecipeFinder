import styles from './WhiteButton.module.scss'

type WhiteButtonProps = {
  className?: string,
  text: string,
  onClick?: () => void,
  disabled: boolean
}

const WhiteButton = ({ text, className, onClick, disabled } : WhiteButtonProps) => {
  return (
    <button className={`${styles.whiteButton} ${className ?? ''}`} {...(onClick && { onClick })}  
      disabled={disabled} 
      style={{cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.6 : 1}}
    >
      { text }
    </button>
  )
}

export default WhiteButton