import { useLayoutEffect, useRef, useMemo, useState } from "react"
import Lottie from 'lottie-react';
import loadingSpinner from '../../assets/loadingPrimaryColor.json'
import styles from "./CardsContainer.module.scss";
import { getGap, getHeight, getPadding, getRecipesFiltersValues } from "../../utils"
import { useAppStore } from "../../stores/useAppStore"
import type { FilterCardsName, RangesType, RecipeCardList } from "../../types";
import { filters } from "../../data";
import Card from "../Card/Card"
import FormFilters from "../FormFilters/FormFilters";


const buildInitialFilters = () : RangesType =>
    (Object.keys(filters) as Array<FilterCardsName>).reduce((acc, filter) => {
      acc[filter] = [filters[filter].min, filters[filter].max]
      return acc
    }, {} as RangesType)

type CardsContainerProps = {
  title: string,
  secondaryTitle: string,
  recipes: RecipeCardList,
  hasRecipes: boolean
}

const CardsContainer = ({ title, secondaryTitle, recipes, hasRecipes } : CardsContainerProps) => {

  const windowWidth = useAppStore(state=> state.windowWidth)
  const isTablet = useAppStore(state => state.isTablet)
  const filtersValues = useAppStore(state => state.filtersValues)
  const setFiltersValues = useAppStore(state=>state.setFiltersValues)
  const isLoading = useAppStore(state=>state.isLoading)

  const [draftFilterValues, setDraftFilterValues] = useState(buildInitialFilters())

  //Formateo de recipe para incluir metricas de items para filtrado
  const recipesWithMetrics = useMemo(() => getRecipesFiltersValues(recipes), [recipes]) 

  //Funcion para filtrado de recetas segun valores de filtersValues
  const filteredRecipes = useMemo(() => {
    if(!recipesWithMetrics) return []

    if(Object.keys(filtersValues).length === 0) return recipes

    const updateRecipes = recipesWithMetrics.filter(recipe => {
      return Object.keys(filtersValues).every(key => {
        const typedKey = key as FilterCardsName
        if (!filtersValues[typedKey] || recipe.metrics[typedKey] === undefined) {
          return false; // Si no existen, no pasa el filtro
        }
        const [min, max] = filtersValues[typedKey] || [] //min y max son undefined si []
        const value = recipe.metrics[typedKey] 
        return value >= min && value <= max //Si min y max son undefined son NaN y es resultado es false
      })
    }).map(recipe=>recipe.recipe)

    return updateRecipes

  }, [recipesWithMetrics, filtersValues])


  const displayedItemsRef = useRef<HTMLElement | null>(null)
  const sectionFiltersRef = useRef<HTMLElement | null>(null)
  const cardListRef = useRef<HTMLDivElement | null>(null)
  const cardRef = useRef<HTMLDivElement | null>(null)
  const h3Ref = useRef<HTMLDivElement | null>(null)

  /* const resetHeight = () => {
    sectionFiltersRef.current!.style.height = ""
  } */

  /* const getHeightRecipes = () => {
    const totalPadding = getPadding(displayedItemsRef.current)
    const gapBox = getGap(displayedItemsRef.current)
    const gapCards = getGap(cardListRef.current)
    const heightCard = getHeight(cardRef.current)
    const h3Height = getHeight(h3Ref.current)
      return (totalPadding + gapBox + gapCards + (heightCard * 2 ) + h3Height)
  } */

  const applyFilters = () => {
    setFiltersValues(draftFilterValues)
  }

  /* useLayoutEffect(() => {
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
  }, [windowWidth, hasRecipes]);  */
  
  return (
    <>
      <div className={styles.cardsContainer}>
        <section ref={displayedItemsRef} className={styles.displayedItems}>
          <h3 ref={h3Ref}>{ title }</h3>
            {
              hasRecipes ?  (
                <div className={styles.cardsScroll}>
                  <div ref={cardListRef} className={styles.cardsList}>
                    {
                      filteredRecipes.map((recipe, i) => {
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
              ) : (isLoading ? 
                <div className={styles.loadingWrapp}>
                  <Lottie 
                  animationData = {loadingSpinner}
                  loop = {true}
                  style={{ width: '50%', height: '50%' }}
                  />
                </div>
                : (
                <p>No results yet. Use the form to search for recipes.</p>
              ))
            }
        </section>  
        <aside ref={sectionFiltersRef} className={styles.filtersSection}>
          <div className={styles.headerFilterSection}>
            <h3>{secondaryTitle}</h3>
            <button className={styles.btnApplyFilters} onClick={applyFilters}>Apply</button>
          </div>
          <FormFilters 
            onChange={setDraftFilterValues}
            draftFilterValues = {draftFilterValues}
          />
        </aside>
      </div>
    </>
  )
}

export default CardsContainer