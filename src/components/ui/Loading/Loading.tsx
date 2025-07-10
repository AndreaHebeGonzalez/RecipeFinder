import Lottie from 'lottie-react'
import loading from '../../../assets/loading.json'
import styles from './Loading.module.scss'
import { useEffect, useRef } from 'react'
import { useAppStore } from '../../../stores/useAppStore'
import { openLoading } from '../../../animations'

const Loading = () => {

  const refLoading = useRef(null)
  const aiIsLoading = useAppStore(state=>state.aiIsLoading)
  const isLoading = useAppStore(state=>state.isLoading) 
  
  useEffect(() => {
    if(aiIsLoading || isLoading) {
        if(refLoading.current) {
          openLoading(refLoading.current)
        }
    }
  }, [aiIsLoading, isLoading, refLoading.current])
  

  return (
    <div className={styles.loadingBox} ref={refLoading}>
      <div className={styles.loading} id='loading'>
        <Lottie 
          animationData = {loading}
          loop = {true}
          style={{ width: '15rem', height: '15rem' }}
        />
      </div>
    </div>
  )
}

export default Loading