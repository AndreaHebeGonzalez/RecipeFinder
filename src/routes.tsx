import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./layouts/Layout"
import IndexPage from "./views/IndexPage/IndexPage"
import FavoritesPage from "./views/FavoritesPage"
import RecipeDetails from "./views/RecipeDetails/RecipeDetails"


const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element = { <Layout /> }>
          <Route path="/" element = { <IndexPage /> } />
          <Route path="/favorites" element = { <FavoritesPage /> } />
          <Route path="/recipe/:id" element = { <RecipeDetails /> } />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter