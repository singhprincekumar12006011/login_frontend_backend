import React, { useState, useContext } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import AuthForm from './AuthForm';
import { loginUser } from '../services/authService';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // Redirect if already logged in
  if (user) {
    return <Navigate to="/dashboard" />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const userData = await loginUser(formData);
      setUser(userData);
      localStorage.setItem('token', userData.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthForm
      isLogin={true}
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      error={error}
      isLoading={isLoading}
      
    />
  );
};

export default Login;
