import axios from "axios";
const base_url = "http://localhost:3000";
export const getAllTastesApi = async () => {
  return await axios.get(`${base_url}/recipe/get-all-tastes`);
};
