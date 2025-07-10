import styles from './CircularButton.module.scss'

type CircularButtonProps = {
	text: string
}

const CircularButton = ({ text } : CircularButtonProps) => {

  return (

    <button className={`${styles.circularBtn} ${(text === "Search with IA") ? styles.starIA : ''}`}>
			<span>{ text }</span>
    </button>
  )
}

export default CircularButton