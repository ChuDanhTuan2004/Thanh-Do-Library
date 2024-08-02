import axios from "axios";

export const BASE_BE_URL ='http://localhost:8080/';

export const axiosInstance = axios.create({
    baseURL: BASE_BE_URL,
    headers:{
        "content-type": "application/json"
    }
});