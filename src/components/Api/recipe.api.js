import axios from "axios";

const baseURL = "http://localhost:3000/recipe";

export const getAllRecipes = async () => {
  return await axios.get(baseURL);
};

export const createRecipe = async (data) => {
  return await axios.post(baseURL, data);
};

export const getRecipesForCurrentUser = async (id) => {
  return await axios.get(`${baseURL}/get-recipes-for-current-user/${id}`);
};

export const getRecipesForOtherUser = async (id) => {
  return await axios.get(`${baseURL}/get-recipes-for-other-users/${id}`);
};

export const getRecipesForFilter = async (listIngredientsId) => {
  return await axios.get(
    `${baseURL}/get-recipes-for-filter/${listIngredientsId}`
  );
};

export const getRecipesForSearchByName = async (name) => {
  return await axios.get(`${baseURL}/search/${name}`);
};

export const createRawMaterialApi = async (data) => {
  return await axios.post(`${baseURL}/recipe-raw-material`, data);
};

export const getRecipesByTaste = async (taste) => {
  return await axios.get(`${baseURL}/get-recipes-by-taste/${taste}`);
};
