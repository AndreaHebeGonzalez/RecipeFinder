

const RecipeDetails = () => {
  return (

    <div className="recipe">
      <section className="recipeHeader">
        <div className="recipeName">
          <h2 className="titleRecipe">Nombre del receta</h2>
          <div className="imageContainer">
            <img src="/public/images/recipe-1.jpg" alt="Nombre del receta" />
          </div>
        </div>
        <aside className="infoContainer">
          <span>Preparation time: <span>45'</span></span>
          <div className="nutritionInfo">
            <h3>
              Nutrition Facts
            </h3>
            <ul className="listNutrition">
              <li className="itemNutrition">
                <span className="nutritionKey">Calories:</span>
                <span className="nutritionValue">456</span>
              </li>
              <li className="itemNutrition">
                <span className="nutritionKey">Calories:</span>
                <span className="nutritionValue">456</span>
              </li>
              <li className="itemNutrition">
                <span className="nutritionKey">Calories:</span>
                <span className="nutritionValue">456</span>
              </li>
              <li className="itemNutrition">
                <span className="nutritionKey">Calories:</span>
                <span className="nutritionValue">456</span>
              </li>
            </ul>
          </div>
        </aside>
      </section>   
      <section className="recipeDescription">
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt a quasi accusamus perspiciatis excepturi facilis id ipsum nisi hic doloremque alias harum, nihil velit quo necessitatibus fugit, ipsa incidunt suscipit!</p>
      </section>
      <section className="recipeDetails">
        <div className="ingredientsContainer">
          <h3>Ingredients</h3>
          <ul className="ingredients">
            <li className="ingredientCard"></li>
          </ul>
        </div>
        <div className="instructionsContainer">
          <h3>Instructions</h3>
          <ol className="instructions">
            <li className="instruction">
              Instruccion - 1
            </li>
            <li className="instruction">
              Instruccion - 1
            </li>
            <li className="instruction">
              Instruccion - 1
            </li>
            <li className="instruction">
              Instruccion - 1
            </li>
          </ol>
        </div>
      </section>
    </div>
  )
}

export default RecipeDetails