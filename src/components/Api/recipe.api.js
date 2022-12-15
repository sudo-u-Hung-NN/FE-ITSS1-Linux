import axios from "axios";


const baseURL = 'http://localhost:3000/recipe';

export const getAllRecipes = async () => {
    return await axios.get(baseURL);
}


export const getRecipesForCurrentUser = async (id) => {
    return await axios.get(`${baseURL}/get-recipes-for-current-user/${id}`);
}

export const getRecipesForOtherUser = async (id) => {
    return await axios.get(`${baseURL}/get-recipes-for-other-users/${id}`);
}

