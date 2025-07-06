import { StateCreator } from "zustand";
import type { RecipeCard, FavoritesList, FavoriteRecipe, AIRecipe } from "../../types";
import { getState } from "../useAppStore";


export type FavoriteSliceType= {
    favorites: FavoritesList,
    hasFavorite: boolean,
    isFavorite: (id: RecipeCard['id']) => boolean,
    handleClickFavorites: (recipe : RecipeCard | AIRecipe) => void
}

export const createFavoriteSlice : StateCreator<FavoriteSliceType> = (set, get) => {
    
    let favoritesInitial = [] as FavoritesList
    let hasFavoritesInitial = false

    const storedFavorites = localStorage.getItem('storedFavorites')

    if (storedFavorites) {
        try {
            favoritesInitial = JSON.parse(storedFavorites)
            hasFavoritesInitial = Array.isArray(favoritesInitial) && favoritesInitial.length > 0
        } catch (e) {
            console.error("Failed to parse stored favorites", e)
        }
    }

    return {
        favorites: favoritesInitial,
        hasFavorite: hasFavoritesInitial,
        isFavorite: (id: RecipeCard['id']) => {
            return get().favorites.some(favorite=> favorite.id === id)
        },
        handleClickFavorites : (recipe : FavoriteRecipe ) => {
            if(get().isFavorite(recipe.id)) {
                const filteredFavorites = get().favorites.filter(favorite=>favorite.id!==recipe.id)
                set({
                    favorites: filteredFavorites,
                    hasFavorite: (filteredFavorites.length > 0)
                })
                getState().openNotification(false, 'The recipe was successfully removed from favorites.')
                console.log('The recipe was successfully removed from favorites.')
            } else {
                set((state) => ({
                    favorites: [...state.favorites, recipe],
                    hasFavorite: true
                })) 
                getState().openNotification(false, 'The recipe was successfully added to favorites.')
                console.log('The recipe was successfully added to favorites.')
            }
            localStorage.setItem('storedFavorites', JSON.stringify(get().favorites))
        }
    }
} 