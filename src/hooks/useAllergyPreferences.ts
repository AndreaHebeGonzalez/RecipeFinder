import { useEffect, useState } from "react"
import { listIntolerances } from "../data"
import { PreferencesSearchType, allergiesOptions } from "../types"



const useAllergyPreferences = (initialAllergies : PreferencesSearchType['allergies']) => {

  const [selectedAllergies, setSelectedAllergies] = useState<allergiesOptions>(
      listIntolerances.reduce((acc, key) => {
        acc[key] = false
        return acc
      }, {} as allergiesOptions) 
    )
  
  const handleSelectAllergies = (intolerance : string) => {
      setSelectedAllergies((prev) => ({
        ...prev,
        [intolerance]: !prev[intolerance]
      }))
    }

  useEffect(() => {
    if(initialAllergies.length > 0) {
      let updatedSelectedAllergies : allergiesOptions = {
        ...selectedAllergies
      } 
      initialAllergies.forEach(intolerance => {
        updatedSelectedAllergies = {
          ...updatedSelectedAllergies,
          [intolerance] : true
        }
      })
      setSelectedAllergies(updatedSelectedAllergies)
    }
  }, [initialAllergies])
  

  return ({
    selectedAllergies,
    handleSelectAllergies
  })
}

export default useAllergyPreferences