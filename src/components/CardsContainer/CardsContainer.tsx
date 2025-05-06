import { useLayoutEffect, useRef, FormEvent, useState } from "react"
import styles from "./CardsContainer.module.scss";
import { getGap, getHeight, getPadding, getRecipesFiltersValues } from "../../utils"
import { useAppStore } from "../../stores/useAppStore"
import Card from "../Card/Card"
import FormFilters from "../FormFilters/FormFilters";
import type { FilterCardsName, RangesType } from "../../types";



type CardsContainerProps = {
  title: string,
  secondaryTitle: string,
}

const CardsContainer = ({ title, secondaryTitle } : CardsContainerProps) => {

  const windowWidth = useAppStore(state=> state.windowWidth)
  const isTablet = useAppStore(state => state.isTablet)
  const recipes = useAppStore( state => state.recipes)
  const hasRecipes = useAppStore( state => state.hasRecipe)


  const [localRecipes, setLocalRecipes] = useState(recipes)

  const displayedItemsRef = useRef<HTMLElement | null>(null)
  const sectionFiltersRef = useRef<HTMLElement | null>(null)
  const cardListRef = useRef<HTMLDivElement | null>(null)
  const cardRef = useRef<HTMLDivElement | null>(null)
  const h3Ref = useRef<HTMLDivElement | null>(null)

  const resetHeight = () => {
    sectionFiltersRef.current!.style.height = ""
  }

  const getHeightRecipes = () => {
    const totalPadding = getPadding(displayedItemsRef.current)
    const gapBox = getGap(displayedItemsRef.current)
    const gapCards = getGap(cardListRef.current)
    const heightCard = getHeight(cardRef.current)
    const h3Height = getHeight(h3Ref.current)
      return (totalPadding + gapBox + gapCards + (heightCard * 2 ) + h3Height)
  }

  const applyFilters = (e : FormEvent<HTMLFormElement>, filtersValues : RangesType) => {
    e.preventDefault()
    const recipesWithMetrics = getRecipesFiltersValues(recipes)
    const filteredRecipes = recipesWithMetrics.filter(recipe => {
      return Object.keys(filtersValues).every(key => {
        const typedKey = key as FilterCardsName
        if (!filtersValues[typedKey] || recipe.metrics[typedKey] === undefined) {
          return false; // Si no existen, no pasa el filtro
        }
        const [min, max] = filtersValues[typedKey] || [] //min y max son undefined si []
        const value = recipe.metrics[typedKey] 
        return value >= min && value <= max //Si min y max son undefined son NaN y es resultado es false
      })
    })
    console.log(filteredRecipes)
    setLocalRecipes(filteredRecipes)
  }


  useLayoutEffect(() => {
    if(hasRecipes) {
      const height = getHeightRecipes()
      if(displayedItemsRef.current) {
        displayedItemsRef.current.style.height = `${height}px`
      }
      if (!isTablet && sectionFiltersRef.current) {
        sectionFiltersRef.current.style.height =  `${height}px`;
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
                      localRecipes.map((recipe, i) => {
                        if(i === 0) {
                          return <Card 
                          key={recipe.id}
                          recipe = { recipe }
                          ref = {cardRef}
                          />
                        }
                        return <Card 
                          key={recipe.id}
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
        <aside ref={sectionFiltersRef} className={styles.filtersSection}>
          <h3>{secondaryTitle}</h3>
          <FormFilters 
            applyFilters = {applyFilters}
          />
        </aside>
      </div>
    </>
  )
}

export default CardsContainer