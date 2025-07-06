import axios from "axios"

export const api = axios.create({
  baseURL: 'https://api.spoonacular.com/recipes/'
})

const apiKey = import.meta.env.VITE_OPENROUTER_KEY

export const apirouter = axios.create({
  baseURL: 'https://openrouter.ai/api/v1/',
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
    "X-Title": "NutriPlan",
    "HTTP-Referer": "http://localhost:5173/"
  }
})


const pexelsKey = import.meta.env.VITE_PEXELS_KEY


export const apiPexels = axios.create({
  baseURL: 'https://api.pexels.com/v1/search',
  headers: {
    Authorization: `${pexelsKey}`
  }
})