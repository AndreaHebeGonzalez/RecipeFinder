import { type Dispatch, memo, type FC, type SetStateAction, useRef, useState, useEffect, ChangeEvent } from "react"
import styles from './RangeSlider.module.scss'
import type { FilterCardsName, rangesType } from "../../types"



type RangeSliderProps = {
  name: FilterCardsName,
  min: number,
  max: number,
  onChange?: Dispatch<SetStateAction<rangesType>>,
  step: number,
  value: rangesType
}

const RangeSliderComponent : FC<RangeSliderProps> = ({name, min, max, onChange, step, value}) => {

  

  const [minValue, setMinValue] = useState(value[name][0])
  const [maxValue, setMaxValue] = useState(value[name][1])

  const [minDisplay, setMinDisplay] = useState(value[name][0])
  const [maxDisplay, setMaxDisplay] = useState(value[name][1])


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
      onChange?.(prev => ({
        ...prev,
        [name]:[value, maxValue]
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
      onChange?.(prev=>({
        ...prev,
        [name]:[minValue, value]
      }))
    }
  }

  return (
    <div className={styles.rangeSliderContainer}>
      <span>{name}:</span>
      <div className={styles.rangeSlider}>
        <div className={styles.track} ref={trackRef} />
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
        />
      </div>
      <div className={styles.containerValues}>
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
