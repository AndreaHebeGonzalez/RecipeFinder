import styles from './SearchContainer.module.scss'
import Form from "../Form/Form"
import Notification from "../Notification/Notification"
import { useAppStore } from '../../stores/useAppStore'
import CircularButton from '../Buttons/CircularButton'



const SearchContainer = () => {

    const showNotification = useAppStore(state=>state.showNotification)

    return (
        <div className={styles.searchSection}>
            <div className={styles.buttonsWrap}>
                <CircularButton 
                    text='Search whith IA'
                />
                <CircularButton 
                    text='Search by name'
                />
            </div>
            
            {
            showNotification ? (
            <div className={styles.toast}>
                <Notification />
            </div>) : null
            }
            <h2>Find Recipe By Ingredients</h2>
            <Form />
        </div>
    )
}

export default SearchContainer