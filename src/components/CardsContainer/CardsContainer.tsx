import { useMemo } from "react"
import Lottie from 'lottie-react';
import loadingSpinner from '../../assets/loadingPrimaryColor.json'
import styles from "./CardsContainer.module.scss";
import { getRecipesFiltersValues } from "../../utils"
import { useAppStore } from "../../stores/useAppStore"
import type { FilterCardsName, RecipeCardList } from "../../types";
import Card from "../Card/Card"
import FormFilters from "../FormFilters/FormFilters";



type CardsContainerProps = {
  title: string,
  recipes: RecipeCardList,
  hasRecipes: boolean
}

const CardsContainer = ({ title, recipes, hasRecipes } : CardsContainerProps) => {
  const filtersValues = useAppStore(state => state.filtersValues)
  const isLoading = useAppStore(state=>state.isLoading)
  const openModal = useAppStore(state=>state.openModal)


  //Formateo de recipe para incluir metricas de items para filtrado
  const recipesWithMetrics = useMemo(() => getRecipesFiltersValues(recipes), [recipes]) 

  //Funcion para filtrado de recetas segun valores de filtersValues
  const filteredRecipes = useMemo(() => {
    console.log('los filtersValues son', filtersValues)
    console.log('Recipes con metricas', recipesWithMetrics)
    if(!recipesWithMetrics) return []

    if(Object.keys(filtersValues).length === 0) return recipes //retorna todas si no hay filtros 

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

  
  return (
    <>
      <section className={styles.displayedItems}>
        <div className={styles.headerCardsContainer}>
          <h3>{title}</h3>
          <img src="/icons/icon--filter.svg" alt="Filters" onClick={()=>openModal(<FormFilters />, 'Filters')}/>
        </div> 
        
          {
            hasRecipes ?  (
              <div className={styles.cardsScroll}>
                <div className={styles.cardsList}>
                  {
                    filteredRecipes.map((recipe, i) => {
                      if(i === 0) {
                        return <Card 
                        key={recipe.id}
                        recipe = { recipe }
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
              <div className={styles.loadingWrap}>
                <Lottie 
                animationData = {loadingSpinner}
                loop = {true}
                style={{ width: '40%', height: '40%' }}
                />
              </div>
              : (
              <p>No results yet. Use the form to search for recipes.</p>
            ))
          }
      </section>
    </>
  )
}

export default CardsContainer
