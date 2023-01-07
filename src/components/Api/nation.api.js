import axios from "axios";
const baseUrl = "http://localhost:3000";
export const getAllNations = async () => {
  return await axios.get(`${baseUrl}/recipe/get-all-nations`);
};
export const getRecipeByNation = async (data) => {
  return await axios.get(`${baseUrl}/recipe/get-by-nations/${data}`);
};
