import { StateCreator } from "zustand";
import type { RecipeCardList, RecipeCard } from "../types";



export type FavoriteSliceType = {
    favorites: RecipeCardList,
    hasFavorite: boolean,
    isFavorite: (id: RecipeCard['id']) => boolean,
    handleClickFavorites: (recipe : RecipeCard) => void,
}

export const createFavoriteSlice : StateCreator<FavoriteSliceType> = (set, get) => {
    
    let favoritesInitial = [] as RecipeCardList
    let hasFavoritesInitial = false

    const storedFavorites = localStorage.getItem('storedFavorites') // favoritesStored
    if(storedFavorites && storedFavorites?.length > 0) {
        favoritesInitial = JSON.parse(storedFavorites)
        hasFavoritesInitial = true
    }

    return {
        favorites: favoritesInitial,
        hasFavorite: hasFavoritesInitial,
        isFavorite: (id: RecipeCard['id']) => {
            return get().favorites.some(favorite=> favorite.id === id)
        },
        handleClickFavorites : (recipe : RecipeCard) => {
            if(get().isFavorite(recipe.id)) {
                const filteredFavorites = get().favorites.filter(favorite=>favorite.id!==recipe.id)
                set({
                    favorites: filteredFavorites,
                    hasFavorite: (get().favorites.length > 0)
                })
                console.log('The recipe was successfully removed from favorites.')
            } else {
                set((state) => ({
                    favorites: [...state.favorites, recipe],
                    hasFavorite: true
                })) 
                console.log('The recipe was successfully added to favorites.')
            }
            localStorage.setItem('storedFavorites', JSON.stringify(get().favorites))
        }
    }
} 