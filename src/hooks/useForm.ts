/* AIForm, Form */

import { useState, ChangeEvent } from "react"
import { useAppStore } from "../stores/useAppStore"
import { useLocation } from "react-router-dom"



const useForm = <T,>(initialValue: T) => {

  const path = useLocation()

  const searchByName = useAppStore(state=>state.searchByName)

  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<T>(initialValue)


  const handleChange = (e : ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setError(null)
    const inputValidated  = validateOnChange(e.target.value)
      setFormData({
        ...formData,
        [e.target.name] : inputValidated
      })
    
  }
    
  const getValidatedData = (input: string) =>  {
    setError(null)

    const trimmedData = input.trim().toLowerCase() //Pasamos todo a minuscula y eliminamos los espacios en el extremo del input
    
    if(!trimmedData) {
      setError("Please enter at least one ingredient or a recipe name.")//show, isError, msg
      return
    }

    if(trimmedData.length < 3) {
      setError("Please enter at least one ingredient or a recipe name (at least 3 characters).")
      return
    }

    const regexInput= /^[a-zA-Z\s,]+$/ //Exp regular para especificar los caracteres permitidos en el input
    const regexVowels = /[aeiou]/i

    if(!regexInput.test(trimmedData)) {
      setError("Your entry can only contain letters, commas, and spaces.")
      return
    }
    
    if(!regexVowels.test(trimmedData)) {
      setError("Please enter valid ingredients or a valid recipe name (e.g., tomato, chicken, rice).")
      return
    }

    let dataArray = trimmedData
    .split(',')
    .map(element => element.trim())
    .filter(element => element !== '') 

    if(dataArray.length === 0) {
      setError("Please enter at least one ingredient or a recipe name.")
      return
    }

    if(dataArray.length > 10) {
      setError('Please enter a maximum of 10 ingredients.')
      return
    }

    const cleanData = dataArray.join(',')
    const cleanDataSpace = dataArray.join(', ')
    
    console.log(cleanData)
    
    return {
      cleanData,
      cleanDataSpace,
    }
  }

  const getValidatedNameRecipe = (nameRecipe: string) => {
    setError(null)
    const trimmedName = nameRecipe.trim().toLocaleLowerCase()
    if(!trimmedName) {
      setError("Please enter the name of the recipe...")
      return
    }
    const regexName = /^[a-zA-Z\s]+$/
    if(!regexName.test(trimmedName)) {
      setError("The recipe name cannot contain numbers or special characters.")
      return
    }
    return trimmedName
  } 

  const resetForm = () => {
    setFormData(initialValue)
  }

  const validateOnChange = (input:string) => {
    setError(null)
    const inputTrimmed = input.trim()
    if(searchByName && path.pathname === '/search') {
      const regexInput= /^[a-zA-Z\s]+$/
      if(!regexInput.test(inputTrimmed)) {
        setError("Your entry can only contain letters, and spaces.")
        return
      }
    }
    if(inputTrimmed === '') {
      setError("Please enter at least one ingredient or a recipe name.")
      return
    }
    const regexInput= /^[a-zA-Z\s,]+$/
    if(!regexInput.test(inputTrimmed)) {
      setError("Your entry can only contain letters, commas, and spaces.")
      return
    }
    return input
  }

  return ({
    formData,
    error,
    handleChange,
    getValidatedNameRecipe,
    getValidatedData,
    resetForm
  })
}

export default useForm