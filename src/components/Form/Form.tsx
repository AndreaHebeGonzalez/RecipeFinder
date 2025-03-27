import styles from './Form.module.scss';

const Form = () => {

  
  return (
    <form className={styles.form}>
      <input 
        type="text" 
        placeholder="Enter ingredients..."
        className="field"
        name="ingredients"
      />

      <div className={styles.wrapper}>
        <input 
          type="submit"
          value={'Search'} 
          className={styles.btnPrimary}
        />

        <div className={styles.searchPreferencies}>
          <p>Set Your Dietary & Allergy Preferences</p>
          <div className={styles.line}></div>
        </div>
      </div>
    </form>
  )
}

export default Form