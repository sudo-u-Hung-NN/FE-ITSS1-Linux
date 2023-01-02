import axios from "axios";
const base_url = "http://localhost:3000";
export const getAllCommentById = async ({ id }) => {
  return await axios.get(`${base_url}/comment/get-by-recipe_id/${id}`);
};
