import axios from "axios";

const baseURL = 'http://localhost:3000/recipe';

export const getAllIngredients = async () => {
    return await axios.get(`${baseURL}/get-all-materials`)
}