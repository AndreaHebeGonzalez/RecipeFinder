import styles from './SearchPage.module.scss'
import CardsContainer from "../../components/CardsContainer/CardsContainer"
import { useAppStore } from "../../stores/useAppStore"
import SearchContainer from "../../components/SearchContainer/SearchContainer"
import { RecipeCard } from '../../types'
import NoDataMessage from '../../components/NoDataMessage/NoDataMessage'


const SearchPage = () => {

  const recipes = useAppStore(state => state.recipes)
  const searchRecipeError =  useAppStore(state=>state.searchRecipeError)
  const hasResponse = useAppStore(state=>state.hasResponse)

  console.log(hasResponse)
  console.log(searchRecipeError)

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

export default SearchPage