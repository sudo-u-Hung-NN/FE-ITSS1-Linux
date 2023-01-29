import axios from "axios";

export const getAllUsers = axios.get(``);
export const getAllRecipes = async () => {
  console.log(process.env.REACT_APP_URL);
  return await axios.get(`${process.env.REACT_APP_URL}/recipe/get-all`);
};
