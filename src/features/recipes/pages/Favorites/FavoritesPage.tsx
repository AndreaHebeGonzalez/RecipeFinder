import styles from "./FavoritePage.module.scss"
import CardsContainer from "../../components/CardsContainer/CardsContainer"
import { useAppStore } from "../../../../stores/useAppStore"
import type { FavoriteRecipe } from "../../../../types"
import NoDataMessage from "../../../../components/ui/feedback/NoDataMessage/NoDataMessage"


const FavoritesPage = () => {

  const { favorites, hasFavorite } = useAppStore()
  
  return (
    <div className={styles.pageBackground}>
      <div className={`${styles.mainLayout} container`}>
        {
          hasFavorite ? 
          <CardsContainer<FavoriteRecipe>
            title = { "Favorite Recipes" }
            recipes = { favorites }
          /> 
          :
          <div className={styles.wrapper}>
            <NoDataMessage
              image = '/images/no-result-search.png'
              alt= 'Illustration for no data or empty state'
              text = 'No favorite recipes yet. Find something delicious and add it to your list!'
            />
          </div>
        }
      </div>
    </div>
  )
}

export default FavoritesPage