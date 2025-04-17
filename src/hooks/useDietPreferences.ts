import { useState } from "react"
import { listDiets } from "../data"
import { DietsOptions } from "../types"


const buildInitial = () : DietsOptions => (listDiets.reduce((acc, key) => {
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

    if(initialDiets.length > 0 && !(Object.values(initialDiets).includes('')) ) {
      initialDiets.forEach(diet => {
        base = toggleDiet(diet, base)
        base = 
        (diet != 'Ketogenic' && diet != 'Gluten free') ? setCompatibility(diet, base) : base 
      })
    }
    return base
  }
  
  function setCompatibility (diet: string, current: DietsOptions) : DietsOptions {
    return Object.fromEntries(
      Object.entries(current).map(([key, value]) => {
        if(key === diet || key === 'Ketogenic' || key === 'Gluten free') {
          return [key, value]
        }
        return [key, {...value, disabled: !value.disabled}]
      })
    )
  }

  function toggleDiet (diet: string, current:  DietsOptions) : DietsOptions {
    return ({
      ...current,
      [diet]: { 
        ...current[diet],
        selected: !current[diet]?.selected
      }
    })
  }

  function handleSelectDiet (diet: string) {
    let updatedSelectedDiets : DietsOptions = toggleDiet(diet, selectedDiets)
    const updatedWithCompatibility = (diet != 'Ketogenic' && diet != 'Gluten free') ? setCompatibility(diet, updatedSelectedDiets) : updatedSelectedDiets   
    setSelectedDiets(updatedWithCompatibility)
  }
    
  return ({
    selectedDiets, 
    handleSelectDiet,
  })
}

export default useDietPreferences
