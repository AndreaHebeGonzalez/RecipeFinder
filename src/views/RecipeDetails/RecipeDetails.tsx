import IngredientCard from "../../components/IngredientCard/IngredientCard"
import NutritionalInfo from "../../components/NutritionalInfo/NutritionalInfo"
import { useAppStore } from "../../stores/useAppStore"
import styles from "./RecipeDetails.module.scss"

const RecipeDetails = () => {

  
  const isMobile = useAppStore(state=>state.isMobile)
  
  return (
    <div className={styles.recipeWrapper}>
      <div className={`${styles.recipe} container`}>
        <section className={styles.recipeHeader}>
          <span className={styles.timePreparation}>{isMobile ? '':'Preparation time: '} <span>45'</span></span>  
          <div className={styles.recipeContent}>
            <h2>Apricot Glazed Apple Tart</h2>
            <div className={styles.contentWrapp}>
              <div className={styles.imageContainer}>
                <img src="/public/images/recipe-1.jpg" alt="Nombre del receta" />
              </div>

              <div className={styles.infoContainer}>
                <NutritionalInfo />
              </div>
            </div>
          </div>
        </section>   
        <section className="recipeDescription">
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt a quasi accusamus perspiciatis excepturi facilis id ipsum nisi hic doloremque alias harum, nihil velit quo necessitatibus fugit, ipsa incidunt suscipit!</p>
        </section>
        <section className="recipeDetails">
          <div className="ingredientsContainer">
            <h3>Ingredients</h3>
            <ul className="ingredients">
              <IngredientCard />
              <IngredientCard />
              <IngredientCard />
            </ul>
          </div>
          <div className="instructionsContainer">
            <h3>Instructions</h3>
            <ol className="instructions">
              <li className="instruction">
                Instruccion - 1
              </li>
              <li className="instruction">
                Instruccion - 1
              </li>
              <li className="instruction">
                Instruccion - 1
              </li>
              <li className="instruction">
                Instruccion - 1
              </li>
            </ol>
          </div>
        </section>
      </div>
    </div>
    
  )
}

export default RecipeDetails