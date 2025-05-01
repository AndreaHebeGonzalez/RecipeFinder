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
    min: 0,
    max: 1500,
    unit: "kcal"
  },
  "Protein": {
    min: 0,
    max: 100,
    unit: "g"
  },
  "Carbohydrates": {
    min: 0,
    max: 150,
    unit: "g"
  },
  "Fat": {
    min: 0,
    max: 70,
    unit: "g"
  },
  "Health score": {
    min: 0,
    max: 100,
    unit: ''
  },
  "Cooking time": {
    min: 0,
    max: 180,
    unit: 'min'
  },
} as const

