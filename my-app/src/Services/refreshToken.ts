import axios from "axios";

// import { useNavigate } from "react-router-dom";

const refreshToken = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) throw new Error('There is no user logged');
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) throw new Error('No refresh token available');

    try {
        const response = await axios.get(`https://localhost:7099/api/auth/refreshtoken`, {
            params: { userId: userId, refreshToken: refreshToken }
        });
        const { accessToken } = response.data;
        localStorage.setItem('token', accessToken);
        return accessToken;
    } catch (error) {
        localStorage.clear();
        
        // Handle error (e.g., clear tokens, redirect to login)
        // const navigate = useNavigate();
        // navigate('/');
        throw error;
    }
};

export default refreshToken;