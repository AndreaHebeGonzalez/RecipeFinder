import { FormEvent, KeyboardEvent } from 'react'
import styles from './AIForm.module.scss'
import { useAppStore } from '../../../../stores/useAppStore'
import FormError from '../../../../components/ui/Error/FormError/FormError'
import useForm from '../../../../hooks/useForm'
import type { AIRequest } from '../../../../types'

const AIForm = () => {

  const generateRecipe = useAppStore(state=>state.generateRecipe)
  const updateInput = useAppStore(state=>state.setAITags)

  const { formData, error, handleChange, getValidatedData, resetForm } = useForm<AIRequest>({
    input: ''
  })


  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if(e.key === "Enter") {
      e.preventDefault()
      /* const validetedTag = getValidated()
      if(!validetedTag) return
      const updatedTags = [...tags]
      updatedTags.push(validetedTag)
      setTags(updatedTags)
      setTag('')  */
    }
  } 

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const dataValidated =  getValidatedData(formData.input)
    if(dataValidated) {
      updateInput(formData)
      generateRecipe(formData)
      resetForm()
    }
  }

  return (
    <form className={styles.aiForm} onSubmit={e=>handleSubmit(e)}>
      <div className={styles.inputBox}>
        <div className={styles.inputWrapper}>
          <input 
            type="text" 
            placeholder='Type ingredients (comma separated) or a recipe name'
            name='input'
            value={formData.input}
            onChange={handleChange}
            onKeyDown={handleEnter}
          />
          {
            error && 
            <div className={styles.errorSign}>
              <img src="/icons/wavy-warning-icon.svg" alt="Error alert" />
            </div> 
          }
        </div>
        <button type="submit" className={`${styles.submitButtonAI} ${error && styles.disabled}`} disabled={error!==null} >
          <img src="/icons/generateAI-icon.svg" alt="Generate recipe" />
        </button>
      </div>
      {
        error ? 
        <FormError 
          message= {error}
        /> : null
      }
      
    </form>
  )
}

export default AIForm