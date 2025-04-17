import styles from './Form.module.scss';
import { useAppStore } from '../../stores/useAppStore';
import { useState } from 'react';
import { mealTypes } from '../../data';
import type { MealTypes, SearchFilterType } from '../../types';


const initialValue = {
  query: '',
  includeIngredients: '',
  type: '' as MealTypes
}

const Form = () => {

  const openModal = useAppStore(state => state.openModal)
  const searchRecipes = useAppStore(state=>state.searchRecipes)

  const [searchFilter, setSearchFilter] = useState<SearchFilterType>(initialValue)

  const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setSearchFilter({
      ...searchFilter,
      [e.target.name] : e.target.value
    })
  }

  const getValidatedIngredients = () =>  {
    const trimmedIngredients = searchFilter.includeIngredients.trim().toLowerCase()
    const typeLower = searchFilter.type.toLowerCase()
    if(!trimmedIngredients) {
      console.log('Por favor ingrese al menos un ingrediente')
      return
    }
    const regexIngredients = /^[a-zA-Z\s,]+$/
    if(!regexIngredients.test(trimmedIngredients)) {
      console.log('Ingredients can only contain letters, commas and spaces.')
      return
    }
    let ingredientsArray = trimmedIngredients.split(',').map(element => element.trim()).filter(element => element !== '')
    if(ingredientsArray.length === 0) {
      console.log('Please enter at least one ingredient.')
      return
    }
    if(ingredientsArray.length > 10) {
      console.log('Please enter a maximum of 10 ingredients.')
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
      const searchFilterClean = {
        ...searchFilter,
        includeIngredients: dateValidated.cleanIngredients,
        type: dateValidated.typeLower as MealTypes
      }
      setSearchFilter(prev => ({
        ...prev,
        includeIngredients: dateValidated.cleanIngredientsSpace
      }))
      searchRecipes(searchFilterClean)
    }
  }

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Enter name or ingredients separated by commas. Ej. potatoes, tomato, chicken"
          className="field"
          name="includeIngredients"
          value={searchFilter.includeIngredients}
          onChange={e => handleChange(e)}
        />
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
        <div className={styles.wrapper}>
          <input 
            type="submit"
            value={'Search'} 
            className={styles.btnPrimary}
          />
          <div className={styles.searchPreferencies}>
            <p onClick={openModal}>Set Your Dietary & Allergy Preferences</p>
            <div className={styles.line}></div>
          </div>
        </div> 
      </form>
    </>
  )
}

export default Form