import { useEffect, useMemo } from "react"
import styles from "./CardsContainer.module.scss";
import { getRecipesFiltersValues } from "../../../../utils"
import { useAppStore } from "../../../../stores/useAppStore"
import type { FilterCardsName, RecipeCard, AIRecipe } from "../../../../types";
import Card from "../RecipeCard/RecipeCard"
import RecipeFiltersForm from "../RecipeFiltersForm/RecipeFiltersForm";
import { useLocation } from "react-router-dom";
import NoDataMessage from "../../../../components/ui/feedback/NoDataMessage/NoDataMessage";


type CardsContainerProps<T extends RecipeCard | AIRecipe> = {
  title: string;
  recipes: T[];
};


const CardsContainer = <T extends RecipeCard | AIRecipe>({ title, recipes } : CardsContainerProps<T>) => {

  const path =  useLocation()
  
  const filtersValues = useAppStore(state => state.filtersValues)
  const resetFilters = useAppStore(state=>state.resetFilters)
  const openModal = useAppStore(state=>state.openModal)

  //Formateo de recipe para incluir metricas de items para filtrado
  const recipesWithMetrics = useMemo(() => getRecipesFiltersValues(recipes), [recipes]) 


  //Funcion para filtrado de recetas segun valores de filtersValues

  const filteredRecipes = useMemo(() => {
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

  useEffect(() => {
    resetFilters()
  }, [path.pathname])

  const noFilteredResults = 
  Object.keys(filtersValues).length > 0 && filteredRecipes.length === 0;
  
  return (
    <div className={styles.displayedItemsWrapper}>
      <section className={styles.displayedItems}>
        <div className={styles.headerCardsContainer}>
          <h2>{title}</h2>
          <img src="/icons/icon--filter.svg" alt="Filters" className={styles.filtersIcon} onClick={()=>openModal(<RecipeFiltersForm />, 'Filters')}/>
        </div> 
        {
          filteredRecipes.length > 0 ?
          <div className={styles.cardsScroll}>
            <div className={styles.cardsList}>
              {
                filteredRecipes.map((recipe) => 
                  <Card 
                    key={recipe.id}
                    recipe = { recipe }
                  />
                )
              }
            </div>
          </div> 
          : 
          noFilteredResults ?
          <NoDataMessage 
            image='/public/images/no-result-search.png'
            alt='Illustration for no data or empty state'
            text= 'No recipes found. Try adjusting your filters or using different ingredients'
          /> :
          null
        } 
      </section>   
    </div>
  )
}

export default CardsContainer
