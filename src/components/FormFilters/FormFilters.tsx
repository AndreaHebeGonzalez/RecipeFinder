import { Dispatch } from 'react'
import styles from './FormFilters.module.scss'
import type { FilterCardsName, RangesType  } from '../../types'
import { RangeSlider } from '../RangeSlider/RangeSlider'
import { filters } from '../../data'


type FormFiltersType = {
  onChange: Dispatch<React.SetStateAction<RangesType>>
  draftFilterValues: RangesType
}

const FormFilters = ({ onChange, draftFilterValues } : FormFiltersType ) => {

  return (
    <form className={styles.formFilters}>
      <div className={styles.filtersWrap}>
        {
          (Object.keys(filters) as Array<FilterCardsName>).map((filter) => {
            return (
              <div key={filter} className={styles.rangeWrap}>
                <RangeSlider 
                  name={filters[filter].name} 
                  nameApi={filter} min={filters[filter].min} 
                  max={filters[filter].max} 
                  step={1} 
                  values={draftFilterValues[filter]}
                  onChange={onChange} 
                  />   
              </div>
            )
          })
        }
      </div>
    </form>
  )
}

export default FormFilters