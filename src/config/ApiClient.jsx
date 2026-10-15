import axios from "axios";
import { redirect } from "react-router";
import Login from "../components/pages/login"
import { useNavigate } from 'react-router';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: {
        "Content-Type": "application/json"
    }
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token")
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
)

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 403) {
            localStorage.removeItem("token")
            window.location.href = "/login";
        }
        return Promise.reject(error)
    }
)

export default apiClient;