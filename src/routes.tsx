import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./layouts/Layout"
import SearchPage from "./views/SearchPage/SearchPage"
import FavoritesPage from "./views/Favorites/FavoritesPage"
import RecipeDetails from "./views/RecipeDetails/RecipeDetails"
import Home from "./views/Home/Home"
import AIGenerate from "./views/AIGenerate/AIGenerate"
import ErrorHttp from "./components/Error/AppError/AppError"


const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element = { <Layout /> }>
          <Route path="/" element = { <Home /> } />
          <Route path="/search" element = { <SearchPage /> } />
          <Route path="/favorites" element = { <FavoritesPage /> } />
          <Route path="/recipe/:id" element = { <RecipeDetails /> } />
          <Route path="/generate" element = { <AIGenerate /> } />
          <Route path="/error" element = { <ErrorHttp /> } />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter