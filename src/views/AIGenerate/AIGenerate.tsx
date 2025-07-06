import { useMemo } from 'react'
import styles from './AIGenerate.module.scss'
import { useAppStore } from '../../stores/useAppStore'
import AIForm from '../../components/AIForm/AIForm'
import GradientButton from '../../components/Buttons/GradientButton'
import AIRecipe from '../../components/AIRecipe/AIRecipe'
import Loading from '../../components/Loading/Loading'
import PrimaryButton from '../../components/Buttons/PrimaryButton'
import AppError from '../../components/Error/AppError/AppError'
import AIError from '../../components/AIError/AIError'



const AIGenerate = () => {
  
  const aiRecipe = useAppStore(state=>state.aiRecipe)
  const isLoading = useAppStore(state=>state.aiIsLoading)
  const appError = useAppStore(state=>state.appError)
  const tagError = useAppStore(state=>state.tagError)
  const aiTags = useAppStore(state=>state.aiTags)
  const generateRecipe = useAppStore(state=>state.generateRecipe)
  const hasAiError = useMemo(() => appError.hasError && appError.source === 'ai', [appError])


  const handleTryAgain = () => {
    if(aiTags) {
      generateRecipe(aiTags)
    }
  }


  
  return (
    <div  className={styles.pageBackground}>

      <div className={`container ${styles.contentLayout}`}>
        <section className={styles.aiButtonGroup}> 
          <GradientButton 
            text = 'Generate Recipe'
          />
          <GradientButton 
            text = 'Ask the nutrition assistant'
          />
          <GradientButton 
            text = 'How does AI work?'
          />
        </section>
        
        <section className={styles.aiSection}>
          <h2>What can I cook today? Ask the AI</h2>
          <AIForm />

          <div className={styles.result}>
            {
              isLoading ? 
              <Loading />
              :
              hasAiError ? 
              <div className={styles.errorBox}>
                <AppError 
                  appError = {appError}
                /> 
                {
                  hasAiError && (appError.kind === 'network' || appError.kind === 'parsing' || appError.kind === 'unexpected') &&

                  <div className={styles.buttonsError}>
                    <PrimaryButton 
                      text = 'Try again'
                      type='button'
                      onClick={handleTryAgain}
                    />
                  </div>
                }
              </div>  
              :
              tagError.hasErrorTag  ? <AIError message={tagError.message ?? "Some or all of the provided ingredients are not recognized as valid food items. Please try again with real ingredients like tomato, rice, or chicken."}/>
              : aiRecipe &&
              <AIRecipe 
                aiRecipe= {aiRecipe}
              /> 
            }
          </div>
        </section>     
      </div>
    </div>
  )
}

export default AIGenerate