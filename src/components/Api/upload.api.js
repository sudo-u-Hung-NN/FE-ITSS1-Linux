import axios from "axios";

const baseURL = 'http://localhost:3000/cloudinary/upload';

export const uploadImageToCloudinary = (fileUpload) => {
    return axios.post(baseURL, fileUpload);
}