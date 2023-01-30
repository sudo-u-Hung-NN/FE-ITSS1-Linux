import axios from "axios";

export const getAllUsers = async () => {
  return await axios.get(`${process.env.REACT_APP_URL}/user/getall`);
};
export const getAllRecipes = async () => {
  return await axios.get(`${process.env.REACT_APP_URL}/recipe/get-all`);
};
