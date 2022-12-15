import axios from "axios";

export const searchApi = (name) => {
  return axios.get(`http://localhost:3000/recipe/${name}`);
};
export const getMaterialApi = () => {
  return axios.get("http://localhost:3000/recipe/getMaterial");
};
