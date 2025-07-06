import styles from './AIRecipe.module.scss'
import PrimaryButton from '../Buttons/PrimaryButton'
import WhiteButton from '../Buttons/WhiteButton'
import Nutrient from '../Nutrients/Nutrient'
import { useAppStore } from '../../stores/useAppStore'
import type { AIRecipe } from '../../types'  
import { useState } from 'react'

type AIRecipeType = {
  aiRecipe: AIRecipe
}

const AIRecipe = ({ aiRecipe } : AIRecipeType) => {
  
  const aiTags = useAppStore(state=>state.aiTags)
  const handleClickFavorites = useAppStore(state=>state.handleClickFavorites)
  const isFavorite = useAppStore(state=>state.isFavorite)

  const [disabled, setDisabled] = useState(false)

  console.log(aiTags)
  console.log(aiRecipe)

  const addToFavorites = () => {
    handleClickFavorites(aiRecipe)
    setDisabled(true)
    setTimeout(() => {
      setDisabled(false)
    }, 4500);

  }

  return (
    <>
      { 
        aiRecipe &&
      <div className={styles.aiRecipe}>
        <div className={styles.recipeCard}>
          <h3 className={styles.recipeTitle}>{aiRecipe?.title}</h3>
          <div className={styles.recipeContent}>
            <div className={styles.IngredientsNutrients}>
              <div className={styles.recipeSection}>
                <div className={styles.sectionHeader}>
                  <img src="/icons/ingredients.png"  loading="eager"/>
                  <h4>Ingredients</h4>
                </div>
                <ul className={styles.ingredientList}>
                  {
                    aiRecipe?.ingredients.map(item=>(
                      <li className={styles.ingredientItem} key={item.name}>
                        <span>{item.name}</span>
                        <p>{item.quantity}</p>
                      </li>
                    ))
                    
                  }
                </ul>
              </div>
              <div className={styles.nutrientsWrapper}>
                <h4>Nutritional Info</h4>
                <div className={styles.nutrients}>
                  {
                    
                    aiRecipe.nutrition.nutrients.map((item)=>(
                      <Nutrient 
                        nutrient={item}
                      />)
                    )
                  }
                </div>
              </div>
            </div>
            <div className={styles.recipeSection}>
              <div className={styles.sectionHeader}>
                <img src="/icons/steps.png" loading="eager"/>
                <h4>Instructions</h4>
              </div>
              <div className={styles.stepsWrapper}>
                {
                  aiRecipe.steps.map(item => 
                    (<div className={item.title && styles.nameStepsBox}>
                      {item.title && <h4>{item.title}</h4>}
                      <ul className={styles.instructionList}>
                        {
                          item.steps.map(step =>(
                            <li>
                              <p>{step.step}</p>
                            </li>
                          ))
                        }
                      </ul>
                    </div>)
                  ) 
                }
              </div>
            </div>
          </div>
          <div className={styles.buttonGroup}>
            <PrimaryButton 
              text='Add to My Plan'
              type='button'
            />
            <WhiteButton 
              className= {styles.primaryColor}
              text= {isFavorite(aiRecipe.id) ? 'Remove to favorite':'Add to favorite'}
              onClick={addToFavorites}
              disabled={disabled}
            />
          </div>
        </div>
      </div>    
      }
    </>
    
  )
}

export default AIRecipe