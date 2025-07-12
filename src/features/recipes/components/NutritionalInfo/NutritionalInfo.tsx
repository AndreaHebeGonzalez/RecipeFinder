import styles from "./NutritutionalInfo.module.scss"
import type { NutrientType } from "../../types"

type NutritionalInfo = {
  nutrients: NutrientType[]
}

const NutritionalInfo = ({ nutrients } : NutritionalInfo) => {

  return (

    <div className={styles.nutritionInfo}>
      <h3>
        Nutrition Facts
      </h3>
      <ul className={styles.listNutrition}>
        {
          nutrients.map(nutrient =>(
            <li className={styles.itemNutrition} key={nutrient.name}>
              <span className={styles.nutritionKey}>{nutrient.name}</span>
              <span className={styles.nutritionValue}>{`${nutrient.amount}${nutrient.unit}`}</span>
            </li>
          ))
        }        
      </ul>
    </div>


    
  )
}

export default NutritionalInfo