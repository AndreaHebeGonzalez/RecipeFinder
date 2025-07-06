
import styles from './NoDataMessage.module.scss'

type NoDataMessage = {
  image: string,
  alt: string | undefined,
  text: string | undefined
}

const NoDataMessage = ({ image, alt, text } : NoDataMessage) => {


  return (
    <div className={styles.messageBox}>
      <img 
        src={image} 
        alt={alt} />
      <p className={styles.text}>{text}</p> 
    </div>
  )
}

export default NoDataMessage