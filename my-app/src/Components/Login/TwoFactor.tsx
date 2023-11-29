import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import authService from '../../Services/authService';
const TwoFactor: React.FC = () => {
    const [code, setCode] = useState('');
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const returnToHome = () => navigate('/');

    useEffect(() => {
        if (isAuthenticated) {
            returnToHome();
        }
    }, [isAuthenticated, returnToHome]);

    const handleSubmit = async (e: React.FormEvent) => {

    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="code">Code:</label>
            <input 
                id="code"
                type="number" 
                value={code} 
                onChange={e => setCode(e.target.value)} 
            />

            <button type="submit">Login</button>
        </form>
    );
};

export default TwoFactor;