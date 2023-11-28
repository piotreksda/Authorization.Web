import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import authService from '../../Services/authService';
const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const returnToHome = () => navigate('/');

    useEffect(() => {
        if (isAuthenticated) {
            returnToHome();
        }
    }, [isAuthenticated, returnToHome]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Call the login function from your auth service
        // If successful, call the login function from your context to update the state
        try {
            await authService.login(username, password, rememberMe);
            login();
            returnToHome();
        } catch (error) {
            
        }
        
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input 
                id="username"
                type="text" 
                value={username} 
                onChange={e => setUsername(e.target.value)} 
            />

            <label htmlFor="password">Password:</label>
            <input 
                id="password"
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
            />

            <label htmlFor="remember-me">Remember Me:</label>
            <input 
                id="remember-me"
                type="checkbox" 
                onChange={e => setRememberMe(e.target.checked)}
            />

            <button type="submit">Login</button>
        </form>
    );
};

export default Login;