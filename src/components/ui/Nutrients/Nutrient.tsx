import { NutrientType } from "../../../types"
import styles from "./Nutrient.module.scss"

type Nutrient = {
  nutrient: Omit<NutrientType, "percentOfDailyNeeds">
}

const Nutrient = ({ nutrient } : Nutrient) => {
  

  return (
    <div className={styles.nutrient}>
      <div className={`${nutrient.name.toLowerCase()}`}></div>{/* circulo de color */}
      <p><span>{nutrient.name.slice(0,1).toLocaleUpperCase() + nutrient.name.slice(1)}: </span>{nutrient.amount}{nutrient.unit}</p>
    </div>
  )
}

export default Nutrient