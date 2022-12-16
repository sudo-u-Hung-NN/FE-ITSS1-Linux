import axios from "axios";

const baseURL = 'http://localhost:3000/recipe';

export const getAllIngredients = async () => {
    return await axios.get(`${baseURL}/get-all-materials`);
}

export const getAllIngredientsForSearch = async (searchTerm) => {
    return await axios.get(`${baseURL}/${searchTerm}`);
}

export const getAllIngredientsForFilter = async () => {
    return await axios.get(`${baseURL}/get-all-materials`);
}