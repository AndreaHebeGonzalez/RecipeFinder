import { useState, FormEvent, useMemo } from "react"
import styles from "./FormPreferencies.module.scss"
import { listDiets, listIntolerances } from "../../data"
import type { preferencesSearchType } from "../../types"
import { useAppStore } from "../../stores/useAppStore"


type dietState = {
  selected: boolean,
  disabled: boolean
}

type dietsOptions = { [key:string] : dietState }

type allergiesOptions = { [key:string] : boolean }


const FormPreferencies = () => {

  const handleSavePreferences = useAppStore(state=>state.handleSavePreferences)

  const [selectedDiets, setSelectedDiets] = useState<dietsOptions>(
    listDiets.reduce((acc, key) => {
      acc[key] = {
        selected: false,
        disabled: false
      }
      return acc
    }, {} as dietsOptions)
  )  

  const [selectedAllergies, setSelectedAllergies] = useState<allergiesOptions>(
    listIntolerances.reduce((acc, key) => {
      acc[key] = false
      return acc
    }, {} as allergiesOptions) 
  )

  const isSaveEnable = useMemo(() => Object.entries(selectedDiets).some(([_, value]) => (
    value.selected
  )) 
  || Object.entries(selectedAllergies).some(([_, value]) => (
    value
  )) , [selectedDiets, selectedAllergies])



  const setCompatibility = (diet: string, current: dietsOptions) : dietsOptions => {
    return Object.fromEntries(
      Object.entries(current).map(([key, value]) => {
        if(key === diet || key === 'Ketogenic' || key === 'Gluten Free') {
          return [key, value]
        }
        return [key, {...value, disabled: !value.disabled}]
      })
    )
  } 

  const handleSelectDiet = (diet: string) => {
    let updatedSelectedDiets : dietsOptions = {
      ...selectedDiets,
      [diet]: { 
        ...selectedDiets[diet],
        selected: !selectedDiets[diet].selected
      }
    }
    const updatedWithCompatibility = (diet != 'Ketogenic' && diet != 'Gluten Free') ? setCompatibility(diet, updatedSelectedDiets) : updatedSelectedDiets   
    setSelectedDiets(updatedWithCompatibility)
  }

  const handleSelectAllergies = (intolerance : string) => {
    setSelectedAllergies((prev) => ({
      ...prev,
      [intolerance]: !prev[intolerance]
    }))
  }
  
  const handleSave = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const diets = Object.entries(selectedDiets)
    .filter(([_, value]) => value.selected)
    .map(([key]) => key)

    const allergies = Object.entries(selectedAllergies)
    .filter(([_, selected]) => selected)
    .map(([key]) => key)
    
    const preferencesUser : preferencesSearchType = {
      diets,
      allergies
    }
    handleSavePreferences(preferencesUser)
  } 

  return (
    <>
      <form className={styles.formContainer} onSubmit={(e) => handleSave(e)}>
        <div className={styles.wrapper}>
          <div className={styles.preferencesContainer}> 
              <h4>Dietary Preferences</h4>
              <p>Select the diets you follow to filter your recipe search:</p>
              <div className={styles.optionsGrid}> 
                {
                  listDiets.map(diet=>(
                    <div className={styles.item} key={diet}>
                      <input 
                        id= {diet}
                        type="checkbox" 
                        checked = {selectedDiets[diet].selected}
                        onChange={() => handleSelectDiet(diet)}
                        disabled = {selectedDiets[diet].disabled}
                      />
                      <label htmlFor={diet}>{diet}</label>
                    </div>
                  ))            
                }
              </div>             
          </div>
          <div className="line"></div> 
          <div className={styles.preferencesContainer}> 
              <h4>Allergy Restrictions</h4>
              <p>Indicate any allergies to avoid recipes containing these ingredients:</p>
              <div className={styles.optionsGrid}> 
                {
                  listIntolerances.map(intolerance=>(
                    <div className={styles.item} key={intolerance}>
                      <input 
                        id= {intolerance}
                        type="checkbox" 
                        checked = {selectedAllergies[intolerance]}
                        onChange={() => handleSelectAllergies(intolerance)}
                      />
                      <label htmlFor={intolerance}>{intolerance}</label>

                    </div>
                  ))            
                }
              </div>
          </div>
        </div>
        <input
          type="submit"
          value='Save Preferences'
          className={styles.btnSecondary}
          disabled={!isSaveEnable}
        />
      </form>
    </>    
  )
}

export default FormPreferencies