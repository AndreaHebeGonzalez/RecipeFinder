import CardsContainer from "../../components/CardsContainer/CardsContainer"
import { useAppStore } from "../../stores/useAppStore"
import SearchContainer from "../../components/SearchContainer/SearchContainer"


const IndexPage = () => {

  const recipes = useAppStore(state => state.recipes)
  const hasRecipes = useAppStore(state => state.hasRecipe)

  return (
    <div className="main-layout container">
      <SearchContainer />   
      <CardsContainer 
        title= {"Recipes"}
        
        recipes = { recipes }
        hasRecipes = { hasRecipes }
      /> 
    </div>
  )
}

export default IndexPage