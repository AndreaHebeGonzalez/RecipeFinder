import styles from './Form.module.scss';
import { useAppStore } from '../../stores/useAppStore';
import { useState } from 'react';
import { mealTypes, searchFilters } from '../../data';
import type { MealTypes, SearchFilterType } from '../../types';
import FormPreferencies from '../FormPreferencies/FormPreferencies';


const buildInitialParams = () => {
  const initialValue =  searchFilters.reduce((acc, param) =>  {
    acc[param]= ''
    return acc
  }, {} as SearchFilterType)
  return initialValue
}

const Form = () => {

  const openModal = useAppStore(state => state.openModal)
  const searchRecipes = useAppStore(state=>state.searchRecipes)
  const openNotification = useAppStore(state=>state.openNotification)

  const [searchFilter, setSearchFilter] = useState<SearchFilterType>(buildInitialParams()) //Este objeto se pasará como parámetro a la funcion que ejecuta la peticion

  
  const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setSearchFilter({
      ...searchFilter,
      [e.target.name] : e.target.value
    })
  }
  
  const getValidatedIngredients = () =>  {
    const trimmedIngredients = searchFilter.includeIngredients.trim().toLowerCase() //Pasamos todo a minuscula y eliminamos los espacios en el extremo del input
    const typeLower = searchFilter.type.toLowerCase() //minuscula al select
    if(!trimmedIngredients) {
      openNotification(true, 'Please enter at least one ingredient.')//show, isError, msg
      return
    }
    const regexIngredients = /^[a-zA-Z\s,]+$/ //Exp regular para especificar los caracteres permitidos en el input
    if(!regexIngredients.test(trimmedIngredients)) {
      openNotification(true, 'Ingredients can only contain letters, commas and spaces.')
      return
    }
    let ingredientsArray = trimmedIngredients.split(',').map(element => element.trim()).filter(element => element !== '') 
    if(ingredientsArray.length === 0) {
      openNotification(true, 'Please enter at least one ingredient.')
      return
    }
    if(ingredientsArray.length > 10) {
      openNotification(true, 'Please enter a maximum of 10 ingredients.')
      return
    }

    const cleanIngredients = ingredientsArray.join(',')
    const cleanIngredientsSpace = ingredientsArray.join(', ')
    
    return {
      cleanIngredients,
      cleanIngredientsSpace,
      typeLower
    }
  }

  const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const dateValidated = getValidatedIngredients()
    if(dateValidated) {
      const searchFilterClean : SearchFilterType = {
        ...searchFilter,
        includeIngredients: dateValidated.cleanIngredients,
        type: dateValidated.typeLower as MealTypes | ''
      }
      setSearchFilter(buildInitialParams())
      searchRecipes(searchFilterClean)
    }
  }

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.flexGroup}>
          <input 
            type="text" 
            placeholder="Enter name or ingredients separated by commas."
            className="field"
            name="includeIngredients"
            value={searchFilter.includeIngredients}
            onChange={e => handleChange(e)}
          />
          <div className={styles.mealType}>
            <label htmlFor="mealType">Meal Type</label>
            <select 
            name="type" 
            id="mealType" 
            value={searchFilter.type}
            onChange={e => handleChange(e)}
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
            className={styles.btnPrimary}
          />
          <div className={styles.searchPreferencies}>
            <p onClick={()=> openModal(<FormPreferencies />, "Search Preferences")}>Set Your Dietary & Allergy Preferences</p>
            <div className={styles.line}></div>
          </div>
        </div> 
      </form>
    </>
  )
}

export default Form