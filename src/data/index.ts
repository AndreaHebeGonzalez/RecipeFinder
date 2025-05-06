export const preferencesParams = ['diet', 'intolerances'] as const
export const searchFilters  = ['query', 'includeIngredients', 'type'] as const 


export const listDiets = [
  "Gluten free",
  "Ketogenic",
  "Vegetarian",
  "Lacto-vegetarian",
  "Ovo-vegetarian",
  "Vegan"
]


export const listIntolerances = [
  "Dairy",
  "Egg",
  "Gluten",
  "Grain",
  "Peanut",
  "Seafood",
  "Sesame",
  "Shellfish",
  "Soy",
  "Sulfite",
  "Tree nut",
  "Wheat"
]


export const mealTypes = [
  "main course",
  "side dish",
  "dessert",
  "appetizer",
  "salad",
  "bread",
  "breakfast",
  "soup",
  "beverage",
  "sauce",
  "marinade",
  "fingerfood",
  "snack",
  "drink"
] as const 


export const filters = {
  "Calories": {
    name: "Calories",
    min: 0,
    max: 1500,
    unit: "kcal"
  },
  "Protein": {
    name: "Protein",
    min: 0,
    max: 100,
    unit: "g"
  },
  "Carbohydrates": {
    name:"Carbohydrates",
    min: 0,
    max: 150,
    unit: "g"
  },
  "Fat": {
    name: "Fat",
    min: 0,
    max: 70,
    unit: "g"
  },
  "healthScore": {
    name: "Health score",
    min: 0,
    max: 100,
    unit: ''
  },
  "readyInMinutes": {
    name: "Cooking time",
    min: 0,
    max: 180,
    unit: 'min'
  },
} as const

