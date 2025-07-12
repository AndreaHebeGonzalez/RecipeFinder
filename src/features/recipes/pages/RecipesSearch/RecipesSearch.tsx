import styles from './RecipesSearch.module.scss'
import CardsContainer from "../../components/CardsContainer/CardsContainer"
import { useAppStore } from "../../../../stores/useAppStore"
import SearchContainer from "../../components/SearchContainer/SearchContainer"
import { RecipeCard } from '../../types'
import NoDataMessage from '../../../../components/ui/feedback/NoDataMessage/NoDataMessage'


const RecipesSearch = () => {

  const recipes = useAppStore(state => state.recipes)
  const searchRecipeError =  useAppStore(state=>state.searchRecipeError)
  const hasResponse = useAppStore(state=>state.hasResponse)

  return (
    <div className={styles.pageBackground}>
      <div className={`${styles.mainLayout} container`} >
        <SearchContainer />   
        {
          hasResponse ?
          searchRecipeError.hasError ?
          <div className={styles.wrapper}>
            <NoDataMessage 
              image= '/images/no-result-search.png'
              alt='Illustration for no data or empty state'
              text={searchRecipeError.message}
            />
          </div>
          :
          <CardsContainer<RecipeCard>
            title= {"Recipes"}
            recipes = { recipes }
          /> : null
        }
      </div>
    </div>
  )
}

export default RecipesSearch



/* features/
├── recipes/
│   ├── components/
│   ├── pages/               # RecipesPage, RecipeDetailsPage
│   ├── services/
│   ├── schemas/
│   └── types/

├── ai/
│   ├── components/          # AIRecipeCard, IAInstruction, etc.
│   ├── forms/               # AIRecipeForm, etc.
│   ├── pages/               # GenerateRecipePage, NutritionAssistantPage
│   ├── services/            # generateRecipe, analyzeImage
│   ├── schemas/             # aiRecipeSchema, nutritionSchema
│   └── types/               # IARecipe, IANutritionData, etc.

├── customRecipes/
│   ├── forms/               # CreateCustomRecipeForm
│   ├── pages/               # CreateCustomRecipePage
│   ├── schemas/
│   ├── services/
│   └── types/
 */