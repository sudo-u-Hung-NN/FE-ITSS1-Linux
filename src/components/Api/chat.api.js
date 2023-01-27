import axios from "axios";

const baseURL = 'http://localhost:3000/chat';

export const getMessage = async (sender_id, reciver_id, recipe_id) => {
    return await axios.get(`${baseURL}/${sender_id}/${reciver_id}/${recipe_id}`)
}

export const createMessage = async (data) => {
    return await axios.post(baseURL, data)
}