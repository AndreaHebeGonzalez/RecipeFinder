
import styles from  "./IngredientCard.module.scss"

const IngredientCard = () => {
  return (
    <li className={styles.ingredientCard}>

      <div className={styles.imageContainer}>
        <img src="/images/ingredients/apple.jpg" alt="apple" />
      </div>
      <div className={styles.textContainer}>
        <h4 className={styles.name}>Apple</h4>
        <p  className={styles.quantities}>6 large</p>
      </div>
      
    </li>
  )
}

export default IngredientCard