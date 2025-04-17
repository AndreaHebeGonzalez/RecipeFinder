import { useState } from "react"
import { listIntolerances } from "../data"
import { AllergiesOptions } from "../types"


const buildInitial = () => (
  listIntolerances.reduce((acc, key) => {
    acc[key] = false
    return acc
  }, {} as AllergiesOptions) 
)

const useAllergyPreferences = (initialAllergies : string[]= []) => {

  const [selectedAllergies, setSelectedAllergies] = useState<AllergiesOptions>(initialValue())
  
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