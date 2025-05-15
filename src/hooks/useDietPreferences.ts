import { useState } from "react"
import { dietsList } from "../data"
import { DietsOption, DietsOptions } from "../types"


const buildInitial = () : DietsOptions => (dietsList.reduce((acc, key) => {
  acc[key] = {
    selected: false,
    disabled: false
  }
  return acc
}, {} as DietsOptions))

const useDietPreferences = (initialDiets : string[] = []) => {

  const [selectedDiets, setSelectedDiets] = useState<DietsOptions>(initialValue())   

  function initialValue()  {
    let base : DietsOptions = buildInitial()

    if(initialDiets.length > 0) {
      initialDiets.forEach(diet => {
        const d = diet as DietsOption
        base = toggleDiet(d, base)
        base = 
        (d != 'Gluten free') ? setCompatibility(d, base) : base 
      })
    }
    return base
  }
  
  function setCompatibility (diet: DietsOption, current: DietsOptions) : DietsOptions {
    return Object.fromEntries(
      Object.entries(current).map(([key, value]) => {
        const k = key as DietsOption
        if(k === diet || k === 'Gluten free') {
          return [k, value]
        }
        return [k, {...value, disabled: !value.disabled}]
      })
    ) as DietsOptions
  }

  function toggleDiet (diet: DietsOption, current:  DietsOptions) : DietsOptions {
    return ({
      ...current,
      [diet]: { 
        ...current[diet],
        selected: !current[diet]?.selected
      }
    })
  }

  function handleSelectDiet (diet: DietsOption) {
    let updatedSelectedDiets : DietsOptions = toggleDiet(diet, selectedDiets)
    const updatedWithCompatibility = (diet != 'Gluten free') ? setCompatibility(diet, updatedSelectedDiets) : updatedSelectedDiets   
    setSelectedDiets(updatedWithCompatibility)
  }
    
  return ({
    selectedDiets, 
    handleSelectDiet,
  })
}

export default useDietPreferences
