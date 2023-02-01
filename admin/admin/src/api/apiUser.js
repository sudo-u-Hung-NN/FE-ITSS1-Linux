import axios from "axios";

export const getAllUsers = async () => {
  return await axios.get(`${process.env.REACT_APP_URL}/user/getall`);
};
export const getAllRecipes = async () => {
  return await axios.get(`${process.env.REACT_APP_URL}/recipe/get-all`);
};
export const changeStatus = async (data) => {
  return await axios.patch(`${process.env.REACT_APP_URL}/user/block/${data}`);
};
