import { useLayoutEffect, useRef } from "react"
import Card from "../../components/Card/Card"
import Form from "../../components/Form/Form"
import { useAppStore } from "../../stores/useAppStore"
import styles from "./IndexPage.module.scss"
import { getGap, getPadding, getHeight } from "../../utils"


const IndexPage = () => {

  const windowWidth = useAppStore(state=> state.windowWidth)

  const resultSearchRef = useRef<HTMLElement | null>(null)
  const suggestionRef = useRef<HTMLElement | null>(null)
  const cardListRef = useRef<HTMLDivElement | null>(null)
  const cardRef = useRef<HTMLDivElement | null>(null)
  const h3Ref = useRef<HTMLDivElement | null>(null)

  const resetHeight = () => {
    suggestionRef.current!.style.height = ""
  }

  const getHeightRecipes = () => {
    const totalPadding = getPadding(resultSearchRef.current)
    const gapBox = getGap(resultSearchRef.current)
    const gapCards = getGap(cardListRef.current)
    const heightCard = getHeight(cardRef.current)
    const h3Height = getHeight(h3Ref.current)
      return (totalPadding + gapBox + gapCards + (heightCard * 2 ) + h3Height)
  }

  useLayoutEffect(() => {
    const isTablet = windowWidth >= 768
    const height = getHeightRecipes()
    if(resultSearchRef.current) {
      resultSearchRef.current.style.height = `${height}px`
    }
    if (isTablet && suggestionRef.current) {
      suggestionRef.current.style.height =  `${height}px`;
    } else {
      resetHeight();
    }
  }, [windowWidth]); 

  return (
    <>
      <section className={styles.searchSection}>
        <h2>Find Recipe By Ingredients</h2>
        <Form />
      </section>

      <div className={styles.resultContainer}>
        <section ref={resultSearchRef} className={styles.recipeResult}>
          <h3 ref={h3Ref}>Search Results</h3>
          <div ref={cardListRef} className={styles.cardList}>
            <Card 
              ref = {cardRef}
            />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </section>  
        <aside ref={suggestionRef} className={styles.suggestions}>
          <h3>Suggestions</h3>
          <div className={styles.cardList}>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </aside>
      </div>
    </>
  )
}

export default IndexPage