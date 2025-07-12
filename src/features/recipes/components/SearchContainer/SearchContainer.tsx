import { Link } from 'react-router-dom'
import styles from './SearchContainer.module.scss'
import RecipeSearchForm from '../../forms/RecipeSearchForm/RecipeSearchForm'
import { useAppStore } from '../../../../stores/useAppStore'
import CircularButton from '../../../../components/ui/Buttons/CircularButton'
import Loading from '../../../../components/ui/Loading/Loading'


const SearchContainer = () => {

  const isLoading = useAppStore(state=>state.isLoading)
  const { searchByName, enableNameSearch, disableNameSearch} = useAppStore();

  return (
    <div className={styles.searchSection}>
      <div className={styles.buttonsWrap}>
        <Link to={'/generate'}>
          <CircularButton 
            text='Search with IA'
          />
        </Link>
  
      </div>
      
      <div className={styles.searchHeader}>
        <h3>Find Recipe</h3>
        <div className={styles.buttonsGroup}>
          <button className={`${searchByName ? styles.whiteButton : styles.primaryBtn}`} style={searchByName ? {zIndex:5} : {zIndex:10}} onClick={disableNameSearch}>
            By ingredients
          </button>
          <button className={`${styles.translateBtn}  ${searchByName ? styles.primaryBtn : styles.whiteButton}`} style={searchByName ? {zIndex:10} : {zIndex:5}} onClick={enableNameSearch}>
            By name
          </button>
        </div>
      </div>
      <RecipeSearchForm />
      {
        isLoading && <Loading />
      }
    </div>
  )
}

export default SearchContainer