import Form from "../../components/Form/Form"
import styles from "./IndexPage.module.scss"
import CardsContainer from "../../components/CardsContainer/CardsContainer"
import Modal from "../../components/Modal/Modal"


const IndexPage = () => {


  return (
    <div className="main-layout container">
      <div className={styles.searchSection}>
        <h2>Find Recipe By Ingredients</h2>
        <Form />
      </div>
      <CardsContainer 
        title= {"Search Results"}
        secondaryTitle= { "Filters" }
      /> 
      <Modal />
    </div>
  )
}

export default IndexPage