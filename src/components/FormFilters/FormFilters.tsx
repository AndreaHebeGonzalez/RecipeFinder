import { useEffect, useState } from 'react'
import styles from './FormFilters.module.scss'
import type { FilterCardsName, rangesType } from '../../types'
import { RangeSlider } from '../RangeSlider/RangeSlider'
import { filters } from '../../data'

const buildInitial = () : rangesType =>
  (Object.keys(filters) as Array<FilterCardsName>).reduce((acc, filter) => {
    acc[filter] = [10, 50]
    console.log(acc)
    return acc
  }, {} as rangesType)


const FormFilters = () => {

  const [ranges, setRanges] = useState<rangesType>(buildInitial())

  useEffect(() => {
    console.log(ranges)
  }, [ranges])
  
  return (
    <form className={styles.formFilters}>
      <div className={styles.filtersWrap}>
        {
          (Object.keys(filters) as Array<FilterCardsName>).map((filter) => {
            return (
              <div key={filter} className={styles.rangeWrap}>
                <RangeSlider name={filter} min={filters[filter].min} max={filters[filter].max} onChange={setRanges} step={1} value={ranges} />   
              </div>
            )
          })
        }
      </div>
    </form>
  )
}

export default FormFilters