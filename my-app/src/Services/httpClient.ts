import axios from 'axios';
import refreshToken from './refreshToken';
import { toast } from 'react-toastify';

const httpClient = axios.create({
    baseURL: 'https://localhost:7099/api/',
    // Other default config
});

httpClient.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

httpClient.interceptors.response.use(response => response, async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
            try {
                const newToken = await refreshToken();
                axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
                return httpClient(originalRequest);
            } catch (error) {
                toast.error(`Zostajesz wylogowany`);
                return Promise.reject(error);
            }
            
            
        } catch (refreshError) {
            return Promise.reject(refreshError);
        }
    }
    else {
        if (error.response) {
            // You can customize the message based on status code or error message
            // toast.error(`${error.response.data.Title}\n${error.response.data.Message}xd`);
            toast.error(`${error.response.data.Title}`);
        } else {
            toast.error("Network error");
        }
    }
    return Promise.reject(error);
});

export default httpClient;