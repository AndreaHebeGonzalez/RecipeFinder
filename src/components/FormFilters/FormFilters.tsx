import { useState } from 'react'
import styles from './FormFilters.module.scss'
import type { FilterCardsName, RangesType  } from '../../types'
import { RangeSlider } from '../RangeSlider/RangeSlider'
import { filters } from '../../data'
import { useAppStore } from '../../stores/useAppStore'


const buildInitialFilters = () : RangesType =>
  (Object.keys(filters) as Array<FilterCardsName>).reduce((acc, filter) => {
    acc[filter] = [filters[filter].min, filters[filter].max]
    return acc
}, {} as RangesType)


const FormFilters = () => {

  const setFiltersValues = useAppStore(state=>state.setFiltersValues)
  const closeModal = useAppStore(state=>state.closeModal)
  const filtersValues = useAppStore(state=>state.filtersValues)


  const [draftFilterValues, setDraftFilterValues] = useState<RangesType>(Object.keys(filtersValues)?.length > 0 ? filtersValues : buildInitialFilters())

  console.log(draftFilterValues)

  const applyFilters = () => {
    setFiltersValues(draftFilterValues)
    closeModal()
  }

  return (
    <div className={styles.formFilterWrap}>
      <form className={styles.formFilters}>
        <div className={styles.filtersWrap}>
          {
            (Object.keys(filters) as Array<FilterCardsName>).map((filter) => {
              return (
                <div key={filter} className={styles.rangeWrap}>
                  <RangeSlider 
                    name={filters[filter].name} 
                    nameApi={filter} 
                    min={filters[filter].min} 
                    max={filters[filter].max} 
                    step={1} 
                    values={draftFilterValues[filter]}
                    onChange={setDraftFilterValues} 
                    />   
                </div>
              )
            })
          }
        </div>
      </form>
      <button onClick={applyFilters} className={styles.btnSecondary}>Apply Filters</button>
    </div>
    
  )
}

export default FormFilters