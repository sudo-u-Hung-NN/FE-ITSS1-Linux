import axios from "axios";
const baseUrl = "http://localhost:3000/";
export const getAllNations = async () => {
  try {
    const listNations = await axios.get(`${baseUrl}/getNation`);
  } catch (err) {
    console.log(err);
  }
};
