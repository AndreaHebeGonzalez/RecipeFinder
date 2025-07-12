import { useEffect, useState } from "react"
import parse from 'html-react-parser';
import IngredientCard from "../../components/IngredientCard/IngredientCard"
import NutritionalInfo from "../../components/NutritionalInfo/NutritionalInfo";
import { useAppStore } from "../../../../stores/useAppStore"
import styles from "./RecipeDetails.module.scss"
import { useParams } from "react-router-dom";
import type { RecipeCard, RecipeDetailSubset, RecipeDetails } from "../../types";
import type { AIRecipe } from "../../../ai/types";
import { getRecipeDetailSubset } from "../../services/recipeServices";
import { getRecipeFormat } from "../../utils";

const urlBase = 'https://img.spoonacular.com/recipes/'

const RecipeDetails = () => {

  const { id } = useParams()
  
  const recipes = useAppStore(state => state.recipes)
  const isTablet = useAppStore(state=>state.isTablet)


  const [recipeDetails, setRecipeDetails] = useState<RecipeDetails | AIRecipe | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const getRecipe = () : RecipeCard | AIRecipe | null => {
    //Busca en estado global recipes, en el caso de que se vincule con recipes de SearchPage
    const fromRecipes = recipes.find(recipe => recipe.id === id)
    if(fromRecipes && fromRecipes.categoryRecipe === 'searchRecipe') return fromRecipes

    //Busca en estado global favorites, en el caso de que se vincule con favorites de FavoritePage
    const favorites = useAppStore.getState().favorites
    const fromFavorites = favorites.find(recipe => recipe.id === id)
    if(fromFavorites) return fromFavorites
    return null //La receta con el id no fue encontrada
  }

  //Para recipes de categoría searchRecipe
  const getRecipeDetails = async(recipe: RecipeCard) => {
    try {
      const recipeDetailSubset : RecipeDetailSubset = await getRecipeDetailSubset(recipe)

      if(!recipeDetailSubset) throw new Error('No se obtuvieron los detalles de la receta')

      const recipeDetails =  getRecipeFormat(recipe, recipeDetailSubset) 

      console.log(recipeDetails)
        setRecipeDetails(recipeDetails)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }


  useEffect(() => {
    let recipe = getRecipe()
    console.log(recipe)
    if(recipe && recipe.categoryRecipe === 'searchRecipe') {
      getRecipeDetails(recipe)
    } else {
      setRecipeDetails(recipe)
      setIsLoading(false)
    }
  }, [])


  return (
    <div className={styles.recipeWrapper}>
      {
        isLoading ? 
        <div className={styles.isLoading}>
          <p>Cargando...</p>
        </div> 
        :
        !recipeDetails ? 
        <div className={styles.isLoading}>
          <p>Recipe not found.</p>
        </div> 
        :
        <div className={`${styles.recipe} container`}>
          <section className={styles.recipeHeader}>
            {
              recipeDetails && recipeDetails.categoryRecipe === 'searchRecipe' &&
              <span className={styles.timePreparation}>{isTablet ? '':'Preparation time: '} <span>{`${recipeDetails.readyInMinutes}'`}</span></span>
            }
              
            <div className={styles.recipeContent}>
              <h2>{recipeDetails.title}</h2>
              <div className={styles.contentWrap}>
                <div className={styles.imageContainer}>
                  <img src={recipeDetails.categoryRecipe === 'searchRecipe' ? `${urlBase}${id}-636x393.jpg`: recipeDetails.image} alt={recipeDetails.title} />
                </div>

                <div className={styles.infoContainer}>
                  <NutritionalInfo 
                    nutrients={recipeDetails.nutrition.nutrients}
                  />
                </div>
              </div>
            </div>
          </section>   
          {
            recipeDetails.categoryRecipe ==='searchRecipe' && 
            <section className={styles.recipeDescription}>
              <div>
                {
                    recipeDetails.summary ?  parse(recipeDetails.summary) : null
                }
              </div>
            </section>
          }
          
          <section className={`${recipeDetails.categoryRecipe === 'searchRecipe' ? styles.searchRecipeDetails : styles.aiRecipeDetails}`}>
            <div className={styles.ingredientsContainer}>
              <h3>Ingredients</h3>
              <div className={styles.ingredientsScroll}>
                {
                  recipeDetails.categoryRecipe === 'searchRecipe' ? 
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
                  :
                  <ul className={styles.aiIngredients}>
                    {
                      recipeDetails.ingredients.map(ingredient => 
                        <li className={styles.ingredientItem} key={ingredient.name}>
                          <span>{ingredient.name}</span>
                          <p>{ingredient.quantity}</p>
                        </li>
                      )
                    }
                  </ul>
                }
              </div>
            </div>
            <div className={styles.instructionsContainer}>
              <h3>Instructions</h3>
              <div className={styles.instructions}>
                {
                  recipeDetails.categoryRecipe === 'searchRecipe' ?

                  recipeDetails.instructions.map(preparation => (
                    <ol className={styles.preparation} key={preparation.name}>
                      <h4 style={{marginBottom: preparation.name !== '' ? '1.5rem' : 0 }}>{preparation.name}</h4>
                      <div className={styles.preparationSteps}>
                        {
                          preparation.steps.map(step=>
                            <li className={styles.instruction} key={step.number}>
                              <span>{step.number}.</span>
                              <p>{step.step}</p>
                            </li>
                          )
                        }
                      </div>
                    </ol>
                  ))
                  : 
                  recipeDetails.steps.map(preparation=>(
                    <ol className={styles.preparation} key={preparation.title}>
                      <h4 style={{marginBottom: preparation.title !== '' ? '1.5rem' : 0 }}>{preparation.title && preparation.title}</h4>
                      <div className={styles.preparationSteps}>
                        {
                          preparation.steps.map(instruction => 
                            <li key={instruction.stepNumber} className={styles.instruction}>
                              <span>{instruction.stepNumber}.</span>
                              <p>{instruction.step}</p>
                            </li>
                          )
                        }
                      </div>
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