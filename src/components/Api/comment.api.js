import axios from "axios";
const base_url = "http://localhost:3000/comment";

export const getAllCommentById = async (id) => {
  return await axios.get(`${base_url}/get-by-recipe_id/${id}`);
};

export const createCommentApi = async (data) => {
  return await axios.post(base_url, data);
};
export const updateCommentApi = async (data) => {
  return await axios.patch(`${base_url}/update`, data);
};
