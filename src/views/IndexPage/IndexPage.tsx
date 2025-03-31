import Form from "../../components/Form/Form"
import styles from "./IndexPage.module.scss"
import CardsContainer from "../../components/CardsContainer/CardsContainer"


const IndexPage = () => {

  return (
    <div className="main-layout container">
      <section className={styles.searchSection}>
        <h2>Find Recipe By Ingredients</h2>
        <Form />
      </section>

      <CardsContainer 
        title= {"Search Results"}
      />
    </div>
  )
}

export default IndexPage