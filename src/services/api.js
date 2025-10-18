import axios from "axios";
import { fetchRefreshToken, logOutUser } from "../store/userSlice";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URI,
    timeout:10000,
    headers:{
        "Content-Type":"application/json"
    }
})

let storeRef;

export const setupInterceptorsApi = (store) => {
    storeRef = store;
    API.interceptors.request.use((config) => {
        const {auth} = storeRef.getState()
        const token = auth?.user?.accessToken;
        if(token){
            config.headers.Authorization = `${token}`
        }
        return config
    }, (error) => {
        return Promise.reject(error)
    })

    API.interceptors.response.use(
        (response) => response,
        async (error) => {
            if (error.response?.status === 401) {
                
            }

            return Promise.reject(error);
        }
    );
}


export default API;