import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import authService from '../../Services/authService';
import AuthFormTypes from './AuthFormTypes';
import { toast } from 'react-toastify';

interface RegisterProps{
    onSwitchForm : (newForm : string) => void
}

const Register: React.FC<RegisterProps> = ({ onSwitchForm }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await authService.Register(username, password, email);            
            onSwitchForm(AuthFormTypes.LOGIN);
            toast.success('Registered :) Now you can login');
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

            <label htmlFor="email">Email:</label>
            <input 
                id="email"
                type="text" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
            />

            <label htmlFor="password">Password:</label>
            <input 
                id="password"
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
            />

            <button type="submit">Register</button>
            <button type="button" onClick={() => onSwitchForm(AuthFormTypes.LOGIN)}>Move to login</button>
        </form>
    );
};

export default Register;