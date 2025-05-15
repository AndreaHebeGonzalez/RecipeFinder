import { useEffect, useState } from "react"
import parse from 'html-react-parser';
import IngredientCard from "../../components/IngredientCard/IngredientCard"
import NutritionalInfo from "../../components/NutritionalInfo/NutritionalInfo"
import { useAppStore } from "../../stores/useAppStore"
import styles from "./RecipeDetails.module.scss"
import { useParams } from "react-router-dom";
import type { RecipeCard, RecipeDetailSubset, RecipeDetails } from "../../types";
import { getRecipeDetailSubset } from "../../service/recipeServices";
import { getRecipeFormat } from "../../utils";


const RecipeDetails = () => {

  const { id } = useParams()
  
  const recipes = useAppStore(state => state.recipes)
  const isTablet = useAppStore(state=>state.isTablet)
  const recipeStored = useAppStore(state=>state.recipeStored) 

  const [recipeDetails, setRecipeDetails] = useState<RecipeDetails>(recipeStored)
  const [isLoading, setIsLoading] = useState(true)

  const getRecipe = () : RecipeCard => {
    const recipeId = Number(id)
    const recipe = recipes.filter(recipe => recipe.id === recipeId)
    return recipe[0]
  }

  const getRecipeDetails = async(recipe: RecipeCard) => {
    const recipeDetailSubset : RecipeDetailSubset = await getRecipeDetailSubset(recipe)
    if(recipeDetailSubset) {
      const recipeDetails =  getRecipeFormat(recipe,  recipeDetailSubset) 
      setRecipeDetails(recipeDetails)
      console.log(recipeDetails)
      localStorage.setItem('recipeDetailsStored', JSON.stringify(recipeDetails))
      setIsLoading(false)
    } 
  }

  useEffect(() => {
    const recipe = getRecipe()
    if(recipe && (Object.keys(recipeStored).length === 0)) {
      getRecipeDetails(recipe)
    } 
    console.log(recipeStored)
    if(!(Object.keys(recipeStored).length === 0)) setIsLoading(false)
  }, [])
  

  return (
    <div className={styles.recipeWrapper}>
    {
      isLoading ? 
      <div className={styles.isLoading}>
        <p>Cargando...</p>
      </div> 
      :
      <div className={`${styles.recipe} container`}>
        <section className={styles.recipeHeader}>
          <span className={styles.timePreparation}>{isTablet ? '':'Preparation time: '} <span>{`${recipeDetails.readyInMinutes}'`}</span></span>  
          <div className={styles.recipeContent}>
            <h2>{recipeDetails.title}</h2>
            <div className={styles.contentWrapp}>
              <div className={styles.imageContainer}>
                <img src={recipeDetails.image} alt={recipeDetails.title} />
              </div>

              <div className={styles.infoContainer}>
                <NutritionalInfo 
                  nutrients={recipeDetails?.nutrients}
                />
              </div>
            </div>
          </div>
        </section>   
        <section className={styles.recipeDescription}>
          <div>
            {
              recipeDetails.summary ?  parse(recipeDetails.summary) : null
            }
            </div>
        </section>
        <section className={styles.recipeDetails}>
          <div className={styles.ingredientsContainer}>
            <h3>Ingredients</h3>
            <ul className={styles.ingredients}>
              {
                recipeDetails.extendedIngredients.map(ingredient => (
                  <IngredientCard 
                    ingredient = { ingredient }
                    key={ingredient.id}
                  />
                ))
              }
            </ul>
          </div>
          <div className={styles.instructionsContainer}>
            <h3>Instructions</h3>
            <div className={styles.instructions}>
              {
                recipeDetails.instructions.map(instruction => (
                  <ol>
                    <h4>{instruction.name}</h4>
                    {
                      instruction.steps.map(step=>(
                        <li className={styles.instruction}>
                          <p>{step.step}</p>
                        </li>
                      ))
                    }
                  </ol>
                ))
              }
              
            </div>
          </div>
        </section>
      </div>
    }
    </div>
  )
}

export default RecipeDetails