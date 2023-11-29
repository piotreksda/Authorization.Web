import React, { useEffect, useState } from 'react';
import Login from './Login';
import Register from './Register';
import TwoFactor from './TwoFactor';
import AuthFormTypes from './AuthFormTypes';
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);
  const [currentForm, setCurrentForm] = useState(AuthFormTypes.LOGIN);

  // ...

  return (
    <div>
      {currentForm === AuthFormTypes.LOGIN && <Login onSwitchForm={(newForm : string) => setCurrentForm(newForm)} />}
      {currentForm === AuthFormTypes.REGISTER && <Register onSwitchForm={(newForm : string) => setCurrentForm(newForm)} />}
      {currentForm === AuthFormTypes.TWO_FACTOR && <TwoFactor />}
    </div>
  );
};

export default AuthPage;