import { useState } from "react"
import { listIntolerances } from "../data"
import { PreferencesSearchType, allergiesOptions } from "../types"


const buildInitial = () => (
  listIntolerances.reduce((acc, key) => {
    console.log('se ejecuto en allergies')
    acc[key] = false
    return acc
  }, {} as allergiesOptions) 
)

const useAllergyPreferences = (initialAllergies : PreferencesSearchType['allergies'] = []) => {

  const [selectedAllergies, setSelectedAllergies] = useState<allergiesOptions>(initialValue())
  
  function initialValue() {
    let base = buildInitial()

    if(initialAllergies.length > 0) {
      initialAllergies.forEach(intolerance => {
        base = {
          ...base,
          [intolerance]: true 
        }
      })
    }
    return base
  }

  function handleSelectAllergies(intolerance : string) {
    setSelectedAllergies((prev) => ({
      
      ...prev,
      [intolerance]: !prev[intolerance]
    }))
  }

  return ({
    selectedAllergies,
    handleSelectAllergies
  })
}

export default useAllergyPreferences