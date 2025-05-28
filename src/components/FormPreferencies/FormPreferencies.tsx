import { FormEvent, useMemo } from "react"
import styles from "./FormPreferencies.module.scss"
import { dietsList, intolerancesList } from "../../data"
import { useAppStore } from "../../stores/useAppStore"
import useDietPreferences from "../../hooks/useDietPreferences"
import useAllergyPreferences from "../../hooks/useAllergyPreferences"
import type { PreferencesSearchType } from "../../types"

const FormPreferencies = () => {

  const { handleSavePreferences, userPreferences } = useAppStore();

  const dietArray = useMemo(() => userPreferences.diet?.split(',').map((key) => key.slice(0,1).toUpperCase() + key.slice(1)).filter(key=>key!==''), [userPreferences])
  const intolerancesArray = useMemo(() => userPreferences.intolerances?.split(',').map((key) => key.slice(0,1).toUpperCase() + key.slice(1)).filter(key=>key!==''), [userPreferences])
  

  const { selectedDiets, handleSelectDiet } = useDietPreferences(dietArray)
  const { selectedAllergies,  handleSelectAllergies } = useAllergyPreferences(intolerancesArray)


  const handleSave = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const diet = Object.entries(selectedDiets)
    .filter(([_, value]) => value.selected)
    .map(([key]) => key.toLowerCase()).join(',')

    const intolerances = Object.entries(selectedAllergies)
    .filter(([_, selected]) => selected) //Filtros aquellas alergias que estan seleccionadas
    .map(([key]) => key.toLowerCase()).join(',')//Regreso en minuscula el nombre de la clave filtrada, quedará un array de claves seleccionadas, y aplico un join separados por coma

    const preferences : PreferencesSearchType = {
      diet,
      intolerances
    }
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
                  dietsList.map(diet=>(
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
                  intolerancesList.map(intolerance=>(
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
        />
      </form>
    </>    
  )
}

export default FormPreferencies