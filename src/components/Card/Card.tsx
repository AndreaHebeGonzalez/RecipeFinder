import styles from "./Card.module.scss"
import ButtonPrimary from "../Buttons/ButtonPrimary"
import { forwardRef } from "react"
import { Link } from "react-router-dom"
import type { RecipeCard } from "../../types"

type CardProps = {
  recipe: RecipeCard
}

const Card = forwardRef<HTMLDivElement, CardProps >(({ recipe }, ref) => {

  return (
    <div ref={ref} className={styles.card}>
      <div className={styles.cardContainer}>
        <h4 className={styles.cardTitle} title={recipe.title}>
          {recipe.title}
        </h4>
        <div className={styles.cardImage}>
          <img src={`${recipe.image}`} alt={`${recipe.title}`} />
        </div>
        <div className={styles.cardInfo}>
          <p>20 min | 50kcal</p>
          <Link to={`/recipe/${recipe.id}`}>
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