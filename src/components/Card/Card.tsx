import styles from "./Card.module.scss"
import ButtonPrimary from "../Buttons/ButtonPrimary"
import { forwardRef } from "react"
import { Link } from "react-router-dom"




const Card = forwardRef<HTMLDivElement>((_, ref) => {

  return (
    <div ref={ref} className={styles.card}>
      <div className={styles.cardContainer}>
        <h4 className={styles.cardTitle}>
          Apricot Glazed...
        </h4>
        <div className={styles.cardImage}>
          <img src="/images/img-card.jpg" alt="Apricot Glazed Dish" />
        </div>
        <div className={styles.cardInfo}>
          <p>20 min | 50kcal</p>
          <Link to='/recipe/2'>
            <ButtonPrimary
              text="View"
            />
          </Link>
          
        </div>
      </div>
    </div>
  )
})

export default Card