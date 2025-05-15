import CardsContainer from "../../components/CardsContainer/CardsContainer"
import { useAppStore } from "../../stores/useAppStore"

const FavoritesPage = () => {

  const { favorites, hasFavorite } = useAppStore()

  return (
    <div className="main-layout container">
      <CardsContainer
        title = { "Favorite Recipes" }
        secondaryTitle = { "Filters" }
        recipes = { favorites }
        hasRecipes = { hasFavorite }
      />
    </div>
  )
}

export default FavoritesPage