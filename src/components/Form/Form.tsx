import styles from './Form.module.scss';
import { useAppStore } from '../../stores/useAppStore';


/* type searchFilterType = {
  ingredients: string[],
  diets: dietsOptions
}



const initialState = {
  ingredients: [],
  diets: {} as dietsOptions
}
 */



const Form = () => {

  //const [searchFilter, setSearchFilter] = useState<searchFilterType>(initialState)

  const openModal = useAppStore(state => state.openModal)

  return (
    <>
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
            <p onClick={openModal}>Set Your Dietary & Allergy Preferences</p>
            <div className={styles.line}></div>
          </div>
        </div> 
      </form>
    </>
  )
}

export default Form