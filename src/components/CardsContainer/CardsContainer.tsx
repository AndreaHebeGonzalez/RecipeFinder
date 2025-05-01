import { useLayoutEffect, useMemo, useRef } from "react"
import styles from "./CardsContainer.module.scss";
import { getGap, getHeight, getPadding } from "../../utils"
import { useAppStore } from "../../stores/useAppStore"
import Card from "../Card/Card"
import FormFilters from "../FormFilters/FormFilters";


type CardsContainerProps = {
  title: string,
  secondaryTitle: string,
}

const CardsContainer = ({ title, secondaryTitle } : CardsContainerProps) => {

  const windowWidth = useAppStore(state=> state.windowWidth)
  const isTablet = useAppStore(state => state.isTablet)
  const recipes = useAppStore( state => state.recipes)

  const hasRecipes = useMemo(() => {
    return recipes.length > 0
  }, [recipes])
 
  const displayedItemsRef = useRef<HTMLElement | null>(null)
  const extraItemsRef = useRef<HTMLElement | null>(null)
  const cardListRef = useRef<HTMLDivElement | null>(null)
  const cardRef = useRef<HTMLDivElement | null>(null)
  const h3Ref = useRef<HTMLDivElement | null>(null)

  const resetHeight = () => {
    extraItemsRef.current!.style.height = ""
  }

  const getHeightRecipes = () => {
    const totalPadding = getPadding(displayedItemsRef.current)
    const gapBox = getGap(displayedItemsRef.current)
    const gapCards = getGap(cardListRef.current)
    const heightCard = getHeight(cardRef.current)
    const h3Height = getHeight(h3Ref.current)
      return (totalPadding + gapBox + gapCards + (heightCard * 2 ) + h3Height)
  }

  useLayoutEffect(() => {
    if(hasRecipes) {
      const height = getHeightRecipes()
      if(displayedItemsRef.current) {
        displayedItemsRef.current.style.height = `${height}px`
      }
      if (!isTablet && extraItemsRef.current) {
        extraItemsRef.current.style.height =  `${height}px`;
      } else {
        resetHeight()
      }
    } else {
      resetHeight()
    }
    
  }, [windowWidth, hasRecipes]); 


  return (
    <>
      <div className={styles.cardsContainer}>
        <section ref={displayedItemsRef} className={styles.displayedItems}>
          <h3 ref={h3Ref}>{ title }</h3>
            {
              hasRecipes ? (
                <div className={styles.cardsScroll}>
                  <div ref={cardListRef} className={styles.cardsList}>
                    {
                      recipes.map((recipe, i) => {
                        if(i === 0) {
                          return <Card 
                          recipe = { recipe }
                          ref = {cardRef}
                          />
                        }
                        return <Card 
                          recipe = { recipe }
                        />
                      })
                    }
                  </div>
                </div>
              ) : (
                <p>No results yet. Use the form to search for recipes.</p>
              )
            }
          
        </section>  
        <aside ref={extraItemsRef} className={styles.extraItems}>
          <h3>{secondaryTitle}</h3>
          <FormFilters />
        </aside>
      </div>
    </>
  )
}

export default CardsContainer