import { useEffect, useState } from "react"
import { listDiets } from "../data"
import { PreferencesSearchType, DietsOptions } from "../types"


const useDietPreferences = (initialDiets : PreferencesSearchType['diets'] = []) => {

  const buildInitial = () : DietsOptions => (listDiets.reduce((acc, key) => {
    console.log('se ejecuto en diet')
    acc[key] = {
      selected: false,
      disabled: false
    }
    return acc
  }, {} as DietsOptions))

  const resetDiets = () => setSelectedDiets(buildInitial())

  const [selectedDiets, setSelectedDiets] = useState<DietsOptions>(buildInitial())   

  const setCompatibility = (diet: string, current: DietsOptions) : DietsOptions => {
    return Object.fromEntries(
      Object.entries(current).map(([key, value]) => {
        if(key === diet || key === 'Ketogenic' || key === 'Gluten Free') {
          return [key, value]
        }
        return [key, {...value, disabled: !value.disabled}]
      })
    )
  }

  const toggleDiet = (diet: string, current:  DietsOptions) : DietsOptions => {
    return ({
      ...current,
      [diet]: { 
        ...current[diet],
        selected: !current[diet].selected
      }
    })
  }

  const handleSelectDiet = (diet: string) => {
    let updatedSelectedDiets : DietsOptions = toggleDiet(diet, selectedDiets)
    const updatedWithCompatibility = (diet != 'Ketogenic' && diet != 'Gluten Free') ? setCompatibility(diet, updatedSelectedDiets) : updatedSelectedDiets   
    setSelectedDiets(updatedWithCompatibility)
  }

  useEffect(() => {
    if(initialDiets.length > 0) {
      let updatedSelectedDiets : DietsOptions = buildInitial()
      initialDiets.forEach(diet => {
        updatedSelectedDiets = toggleDiet(diet, updatedSelectedDiets)
        updatedSelectedDiets = 
        (diet != 'Ketogenic' && diet != 'Gluten Free') ? setCompatibility(diet, updatedSelectedDiets) : updatedSelectedDiets 
      }),
      setSelectedDiets(updatedSelectedDiets)
    }
  }, [initialDiets])
    

  return ({
    selectedDiets, 
    handleSelectDiet,
    resetDiets
  })
}

export default useDietPreferences
