import { FormEvent, useMemo } from "react"
import styles from "./FormPreferencies.module.scss"
import { listDiets, listIntolerances } from "../../data"
import { useAppStore } from "../../stores/useAppStore"
import useDietPreferences from "../../hooks/useDietPreferences"
import useAllergyPreferences from "../../hooks/useAllergyPreferences"
import type { PreferencesSearchType } from "../../types"

const FormPreferencies = () => {

  const { handleSavePreferences, userPreferences } = useAppStore();

  const { selectedDiets, handleSelectDiet } = useDietPreferences(userPreferences.diets)
  const { selectedAllergies,  handleSelectAllergies } = useAllergyPreferences(userPreferences.allergies)


  const isSaveEnable = useMemo(() => Object.entries(selectedDiets).some(([_, value]) => (
    value.selected
  )) 
  || Object.entries(selectedAllergies).some(([_, value]) => (
    value
  )) , [selectedDiets, selectedAllergies])


  const handleSave = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const diets = Object.entries(selectedDiets)
    .filter(([_, value]) => value.selected)
    .map(([key]) => key)

    const allergies = Object.entries(selectedAllergies)
    .filter(([_, selected]) => selected)
    .map(([key]) => key)

    const preferences : PreferencesSearchType = {
      diets,
      allergies
    }
    console.log('Se ejecuto Save')
    handleSavePreferences(preferences)
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