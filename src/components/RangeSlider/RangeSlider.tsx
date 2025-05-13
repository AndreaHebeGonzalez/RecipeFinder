import { memo, type FC, useRef, useState, useEffect, ChangeEvent , Dispatch} from "react"
import styles from './RangeSlider.module.scss'
import type { FiltersName, FilterCardsName, Range, RangesType } from "../../types"
import { useAppStore } from "../../stores/useAppStore"


type RangeSliderProps = {
  name: FiltersName,
  nameApi: FilterCardsName,
  min: number,
  max: number,
  step: number,
  values: Range,
  onChange: Dispatch<React.SetStateAction<RangesType>>,
}

const RangeSliderComponent : FC<RangeSliderProps> = ({ name, nameApi, min, max, step, values, onChange }) => {

  const  hasRecipe = useAppStore(state=>state.hasRecipe)

  const [minValue, setMinValue] = useState(values[0])
  const [maxValue, setMaxValue] = useState(values[1])

  const [minDisplay, setMinDisplay] = useState(values[0])
  const [maxDisplay, setMaxDisplay] = useState(values[1])


  const trackRef= useRef<HTMLDivElement | null>(null)
  const minInputRef = useRef<HTMLInputElement | null>(null)
  const maxInputRef = useRef<HTMLInputElement | null>(null)

  const minDisplayRef = useRef<HTMLDivElement | null>(null)
  const maxDisplayRef = useRef<HTMLDivElement | null>(null)

  const Z_INDEX_MIN = '10'
  const Z_INDEX_MAX = '20'

  useEffect(() => {
    if(trackRef && trackRef.current) {
      const minLeft = `${((minValue - min) / (max - min)) * 100}%`
      const maxRight = `${((max- maxValue) / (max - min)) * 100}%`
    
      trackRef.current.style.left = minLeft
      trackRef.current.style.right = maxRight
    }
  }, [min, max, minValue, maxValue])

  
  const handleChangeMin = (e: ChangeEvent<HTMLInputElement>) : void => {
    if(minInputRef && minInputRef.current && maxInputRef && maxInputRef.current) {
      minInputRef.current.style.zIndex = Z_INDEX_MAX
      maxInputRef.current.style.zIndex = Z_INDEX_MIN
    }

    const value = Number(e?.target.value)
    
    if(value <= maxValue) {
      setMinValue(value)
      setMinDisplay(value)

      const filterValue = {
        [nameApi]: [value, maxValue]
      } 

      onChange((prev) => ({
        ...prev,
        ...filterValue
      }))
    }
  }

  const handleChangeMax = (e: ChangeEvent<HTMLInputElement>) : void => {
    if(minInputRef && minInputRef.current && maxInputRef && maxInputRef.current) {
      minInputRef.current.style.zIndex = Z_INDEX_MIN
      maxInputRef.current.style.zIndex = Z_INDEX_MAX
    }
    const value = Number(e?.target.value)
    if(value >= minValue) {
      setMaxValue(value)
      setMaxDisplay(value)

      const filterValue = {
        [nameApi]: [minValue, value]
      }

      onChange((prev) => ({
        ...prev,
        ...filterValue
      }))
    }
  }

  return (
    <div className={styles.rangeSliderContainer}>
      <span className= {styles.filterName}>{name}:</span>
      <div className={`${styles.rangeSlider} ${hasRecipe ? '': styles.disabledFilter}`}>
        <div className={styles.track}  ref={trackRef} />
        <input 
          className={`${styles.input} ${styles.input_min}`}
          type="range"
          min={min}
          max={max}
          name="min"
          ref={minInputRef}
          step={step}
          value={minValue}
          onChange={handleChangeMin}
          disabled= {!hasRecipe}
        />

        <input 
          className={`${styles.input} ${styles.input_max}`}
          type="range"
          min={min}
          max={max}
          name="max"
          ref={maxInputRef}
          step={step}
          value={maxValue}
          onChange={handleChangeMax}
          disabled= {!hasRecipe}
        />
      </div>
      <div className={`${styles.containerValues} ${hasRecipe ? '': styles.disabled}`}>
        <div className={`${styles.containerValue} ${styles.containerValueMin}`} ref={minDisplayRef}>
          <div className={styles.valuesMin}>{minDisplay}</div>
        </div>
        <div className={`${styles.containerValue} ${styles.containerValueMax}`} ref={maxDisplayRef}>
          <div className={styles.valuesMax}>{maxDisplay}</div>
        </div>
      </div>
    </div>
  )
}

export const RangeSlider = memo(RangeSliderComponent)
