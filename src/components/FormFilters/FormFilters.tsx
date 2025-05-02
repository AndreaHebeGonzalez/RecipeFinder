import { useState, FormEvent } from 'react'
import styles from './FormFilters.module.scss'
import type { FilterCardsName, RangesType } from '../../types'
import { RangeSlider } from '../RangeSlider/RangeSlider'
import { filters } from '../../data'



const buildInitial = () : RangesType =>
  (Object.keys(filters) as Array<FilterCardsName>).reduce((acc, filter) => {
    acc[filter] = [filters[filter].min, filters[filter].max]
    return acc
  }, {} as RangesType)


const FormFilters = ({ applyFilters } : { applyFilters: (e: FormEvent<HTMLFormElement>, filters: RangesType) => void }) => {

  const [ranges, setRanges] = useState<RangesType>(buildInitial())

  return (
    <form onSubmit={(e) => applyFilters(e, ranges)} className={styles.formFilters}>
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
      <input 
        type="submit"
        value={'Apply Filter'}
      />
    </form>
  )
}

export default FormFilters