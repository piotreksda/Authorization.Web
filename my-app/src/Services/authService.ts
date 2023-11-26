import httpClient from "./httpClient";


const login = async (login: string, password: string, rememberMe: boolean) => {
    const response = await httpClient.post('/auth/login', { login, password, rememberMe });
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        // Set token in httpClient or do additional setup
    }
    if (response.data.userId) {
        localStorage.setItem('userId', response.data.userId);
        // Set token in httpClient or do additional setup
    }
    if (response.data.refreshToken) {
        localStorage.setItem('refreshToken', response.data.refreshToken);
        // Set token in httpClient or do additional setup
    }
    return response.data;
};

const logout = async () => {
    
}

export default {
    login,
    // other auth related functions
};