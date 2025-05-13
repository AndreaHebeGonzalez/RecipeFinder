import { forwardRef } from "react"
import { Link } from "react-router-dom"
import styles from "./Card.module.scss"
import ButtonPrimary from "../Buttons/ButtonPrimary"
import type { RecipeCard } from "../../types"
import { useAppStore } from "../../stores/useAppStore"


type CardProps = {
  recipe: RecipeCard
}

const Card = forwardRef<HTMLDivElement, CardProps >(({ recipe }, ref) => {

  const selectRecipe = useAppStore(state=>state.selectRecipe)

  const getCalories = () : number | string =>  {
    const calories = recipe.nutrition.nutrients.find(nutrient=>nutrient.name === "Calories")?.amount
    if(calories) {
      return Math.round(calories)
    } else {
      return ''
    }
  } 

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
          <p>{`${recipe.readyInMinutes}min | ${getCalories()}kcal`}</p>
          <Link to={`/recipe/${recipe.id}`} onClick={() => selectRecipe(recipe)}>
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