import { Link  } from "react-router-dom"
import styles from "./RecipeCard.module.scss"
import ButtonPrimary from "../../../../components/ui/Buttons/PrimaryButton"
import type { AIRecipe, RecipeCard } from "../../../../types"
import { useAppStore } from "../../../../stores/useAppStore"
import { useEffect  } from "react"


type CardProps<T extends RecipeCard | AIRecipe> = { //El tipo puede ser 
  recipe: T
}

const RecipeCard = <T extends RecipeCard | AIRecipe>({ recipe } : CardProps<T>) => {

  console.log(recipe)

  const isFavorite = useAppStore(state=>state.isFavorite)
  const handleClickFavorites = useAppStore(state=>state.handleClickFavorites)
  const favorites = useAppStore(state=>state.favorites)

  const getCalories = () : number | string =>  {
    const calories = recipe.nutrition.nutrients.find(nutrient=>nutrient.name === "Calories")?.amount
    if(calories) {
      return Math.round(calories)
    } else {
      return ''
    }
  } 

  useEffect(() => {
    isFavorite(recipe.id)
  }, [favorites])
  

  
  return (
    <div className={styles.card}>
      <div className={styles.cardContainer}>
        <div className={styles.favorite}>
          <img 
            onClick={() => handleClickFavorites(recipe)}
            src={isFavorite(recipe.id) ? "/icons/heart-solid-icon.svg" : "/icons/heart-outline-icon.svg"} 
            alt="Add to favorites"
          />
        </div>
        <h4 className={styles.cardTitle} title={recipe.title}>
          {recipe.title}
        </h4>
        <div className={styles.cardImage}>
          <img src={recipe.image} alt={`${recipe.title}`} />
        </div>
        <div className={styles.cardInfo}>
          {
            recipe.categoryRecipe === 'searchRecipe' ? <p>{`${recipe.readyInMinutes}min | ${getCalories()}kcal`}</p>
            :
            recipe.categoryRecipe === 'aiRecipe' ? 
            <p>{` ${getCalories()}kcal`}</p> 
            : null
          }
          <Link to={`/recipe/${recipe.id}`}>
            <ButtonPrimary
              text="View"
              type="button"
            />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RecipeCard