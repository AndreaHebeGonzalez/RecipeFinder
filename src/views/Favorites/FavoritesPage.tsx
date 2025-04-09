import CardsContainer from "../../components/CardsContainer/CardsContainer"

const FavoritesPage = () => {



  return (
    <div className="main-layout container">
      <CardsContainer
        title = { "Favorite Recipes" }
        secondaryTitle = { "Recommended" }
      />
    </div>
  )
}

export default FavoritesPage