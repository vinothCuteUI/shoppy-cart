import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URI,
    timeout:10000,
    headers:{
        "Content-Type":"application/json"
    }
})

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if(token){
        config.headers.Authorization = `${token}`
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

export default API;