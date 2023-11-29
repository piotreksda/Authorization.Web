import { Endpoints } from "../Configurations/Endpoints";
import httpClient from "./httpClient";


const Login = async (login: string, password: string, rememberMe: boolean) => {
    const endpoint = Endpoints.Login;
    try {
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
    } catch (error) {
        throw error;
    }
    
};

const logout = async () => {
    
}

const Register = async (login: string, password: string, email: string) => {
    try {
        const endpoint = Endpoints.Register;
        const response = await httpClient.request(endpoint, { data: {UserName: login, password, email}})
        return response.data;
    } catch (error) {
        throw error;
    }
    
    
}

export default {
    Login,
    Register
};