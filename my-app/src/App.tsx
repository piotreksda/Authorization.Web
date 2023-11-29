import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Dashboard from './Components/Dashboard/Dashboard';
import Menu from './Components/Menu/Menu';
import AuthPage from './Components/Login/AuthPage';
import { AuthProvider } from './Context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <AuthProvider>
        <Router>
        <ToastContainer/>
          <Menu />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<AuthPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    </AuthProvider>
  );
}

export default App;
