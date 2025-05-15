import Form from "../../components/Form/Form"
import styles from "./IndexPage.module.scss"
import CardsContainer from "../../components/CardsContainer/CardsContainer"
import Modal from "../../components/Modal/Modal"
import { useAppStore } from "../../stores/useAppStore"


const IndexPage = () => {

  const recipes = useAppStore(state => state.recipes)
  const hasRecipes = useAppStore(state => state.hasRecipe)

  return (
    <div className="main-layout container">
      <div className={styles.searchSection}>
        <h2>Find Recipe By Ingredients</h2>
        <Form />
      </div>
      <CardsContainer 
        title= {"Recipes"}
        secondaryTitle= { "Filters" }
        recipes = { recipes }
        hasRecipes = { hasRecipes }
      /> 
      <Modal />
    </div>
  )
}

export default IndexPage