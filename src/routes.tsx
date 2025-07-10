import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./layouts/Layout"
import RecipesSearch from "./features/recipes/pages/RecipesSearch/RecipesSearch"
import FavoritesPage from "./features/recipes/pages/Favorites/FavoritesPage"
import RecipeDetails from "./features/recipes/pages/RecipeDetails/RecipeDetails"
import Home from "./views/Home/Home"
import AIGenerate from "./features/ai/pages/AIGenerate/AIGenerate"
import ErrorPage from "./views/Error/ErrorPage"



const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element = { <Layout /> }>
          <Route path="/" element = { <Home /> } />
          <Route path="/search" element = { <RecipesSearch /> } />
          <Route path="/favorites" element = { <FavoritesPage /> } />
          <Route path="/recipe/:id" element = { <RecipeDetails /> } />
          <Route path="/generate" element = { <AIGenerate /> } />
          <Route path="/error" element = { <ErrorPage /> } />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter