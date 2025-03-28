
import styles from "./NutritutionalInfo.module.scss"

const NutritionalInfo = () => {
  return (

    <div className={styles.nutritionInfo}>
      <h3>
        Nutrition Facts
      </h3>
      <ul className={styles.listNutrition}>
        <li className={styles.itemNutrition}>
          <span className={styles.nutritionKey}>Calories</span>
          <span className={styles.nutritionValue}>456</span>
        </li>
        <li className={styles.itemNutrition}>
          <span className={styles.nutritionKey}>Calories</span>
          <span className={styles.nutritionValue}>456</span>
        </li>
        <li className={styles.itemNutrition}>
          <span className={styles.nutritionKey}>Calories</span>
          <span className={styles.nutritionValue}>456</span>
        </li>
        <li className={styles.itemNutrition}>
          <span className={styles.nutritionKey}>Calories</span>
          <span className={styles.nutritionValue}>456</span>
        </li>
        <li className={styles.itemNutrition}>
          <span className={styles.nutritionKey}>Calories</span>
          <span className={styles.nutritionValue}>456</span>
        </li>
        
      </ul>
    </div>


    
  )
}

export default NutritionalInfo