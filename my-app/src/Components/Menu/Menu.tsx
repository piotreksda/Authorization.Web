import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

const StyledNav = styled.nav`
    background-color: #f0f0f0;
    padding: 10px;
    border-bottom: 1px solid #ddd;
`;

const StyledLink = styled(Link)`
    margin-right: 10px;
    color: #333;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

const Menu: React.FC = () => {

    const { isAuthenticated, logout } = useAuth();

    return (
        <StyledNav>
            <StyledLink to="/">Home</StyledLink>
            {isAuthenticated ?? <StyledLink to="/dashboard">Dashboard</StyledLink>}
            {isAuthenticated ? <button onClick={logout}>Logout</button> : <StyledLink to="/login">Login</StyledLink>}
        </StyledNav>
    );
};

export default Menu;