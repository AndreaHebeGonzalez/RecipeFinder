import styles from './Form.module.scss';
import { useAppStore } from '../../stores/useAppStore';
import { mealTypes, searchFilters } from '../../data';
import FormPreferencies from '../FormPreferencies/FormPreferencies';
import useForm from '../../hooks/useForm';
import type { SearchFilterType, MealTypes } from '../../types';
import FormError from '../Error/FormError/FormError';



const buildInitialParams = () => {
  const initialValue =  searchFilters.reduce((acc, param) =>  {
    acc[param]= ''
    return acc
  }, {} as SearchFilterType)
  return initialValue
}


const Form = () => {

  const openModal = useAppStore(state => state.openModal)
  const searchByName = useAppStore(state=>state.searchByName)
  const searchRecipes = useAppStore(state=>state.searchRecipes)
  
  const { formData, error, handleChange, getValidatedNameRecipe, getValidatedData, resetForm } = useForm<SearchFilterType>(buildInitialParams())


  const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const typeLower = formData.type.toLowerCase() //minuscula al select
    if(searchByName) {
      const validatedName = getValidatedNameRecipe(formData.query)
      if(validatedName) {
        const formDataClean : SearchFilterType = {
          ...formData,
          query: validatedName,
          type: typeLower as MealTypes | ''
        }
        resetForm()
        searchRecipes(formDataClean)
      }
      return
    }
      
    const validatedData = getValidatedData(formData.includeIngredients)
    if(validatedData) {
      const formDataClean: SearchFilterType = {
        ...formData,
        includeIngredients: validatedData.cleanData,
        type: typeLower as MealTypes | ''
      }
      searchRecipes(formDataClean)
      resetForm()
    }
  }
  

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.flexGroup}>
          <input 
            type="text" 
            placeholder= {searchByName ? "Enter the name of the recipe..." : "Enter ingredients separated by commas..."}
            className="field"
            name= { searchByName ?  "query" : "includeIngredients" }
            value={searchByName ? formData.query : formData.includeIngredients }
            onChange={handleChange}
          />
          <div className={styles.mealType}>
            <label htmlFor="mealType">Meal Type</label>
            <select 
            name="type" 
            id="mealType" 
            value={formData.type}
            onChange={handleChange}
          >
            <option value="">-- Select a meal type --</option>
            {
              mealTypes.map(type => (
                <option 
                  key={type}  
                  value={type}
                >{type}</option>
              ))
            }
            </select>
          </div>
        </div>
        <div className={styles.searchActions}>
          <input 
            type="submit"
            value={'Search'} 
            className= {`${styles.primaryBtn} ${error ? styles.disabled : ''}`}
            disabled={error !== null}
          />
          <div className={styles.searchPreferencies}>
            <p onClick={()=> openModal(<FormPreferencies />, "Search Preferences")}>Set Your Dietary & Allergy Preferences</p>
            <div className={styles.line}></div>
          </div>
        </div> 

        {
          error &&
          <FormError 
            message= {error}
          />
        }
      </form>
    </>
  )
}

export default Form