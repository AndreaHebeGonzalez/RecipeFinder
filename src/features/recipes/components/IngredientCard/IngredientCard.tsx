
import styles from  "./IngredientCard.module.scss"
import type { RecipeIngredients } from "../../../../types"

type IngredientCard = {
  ingredient: RecipeIngredients 
}

const IngredientCard = ({ ingredient } : IngredientCard) => {

  const urlBase = 'https://spoonacular.com/cdn/ingredients_100x100/'

  return (
    <li className={styles.ingredientCard}>
      <div className={styles.imageContainer}>
        <img src={`${urlBase}${ingredient.image}`} alt={ingredient.name} />
      </div>
      <div className={styles.textContainer}>
        <h4 className={styles.name} title={ingredient.name}>{ingredient.name}</h4>
        <p  className={styles.quantities}>{`${ingredient.measures.metric.amount} ${ingredient.measures.metric.unitShort}`}</p>
      </div>
      
    </li>
  )
}

export default IngredientCard