import Endpoints from "../Configurations/Endpoints";
import httpClient from "./httpClient";


const login = async (login: string, password: string, rememberMe: boolean) => {
    const endpoint = Endpoints['login'];
    const response = await httpClient.request(endpoint, { data: {login, password, rememberMe }} );
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
    }
    if (response.data.userId) {
        localStorage.setItem('userId', response.data.userId);
    }
    if (response.data.refreshToken) {
        localStorage.setItem('refreshToken', response.data.refreshToken);
    }
    return response.data;
};

const logout = async () => {
    
}

export default {
    login,
};