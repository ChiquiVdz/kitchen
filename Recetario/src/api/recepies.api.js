import axios from 'axios'

const recepieApi = axios.create({
    baseURL: 'http://localhost:8000/recepies/api/v1/recepies/'
})

const ingredientApi = axios.create({
    baseURL: 'http://localhost:8000/recepies/api/v1/ingredients/'
})

export const getAllRecepies = () => recepieApi.get('/')

export const createRecepie = (recepie) => recepieApi.post('/', recepie)

export const deleteRecepie = (id) => recepieApi.delete(`/${id}/`)

export const updateRecepie = (id, recepie) => recepieApi.put(`/${id}/`, recepie)

export const getRecepie = (id) => recepieApi.get(`/${id}/`)

export const getIngredients = () => ingredientApi.get('/')

export const createIngredient = (ingredient) => ingredientApi.post('/', ingredient)