import styles from './CircularButton.module.scss'

type CircularButtonProps = {
	text: string
}

const CircularButton = ({ text } : CircularButtonProps) => {

  return (

    <button className={`${styles.circularBtn} ${(text === "Search whith IA") ? styles.starIA : ''}`}>
			{ text }
    </button>
  )
}

export default CircularButton