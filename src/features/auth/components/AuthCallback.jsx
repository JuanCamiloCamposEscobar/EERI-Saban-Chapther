import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    if (token) {
      localStorage.setItem('token', token);
      // Optional: Fetch user profile here to update global state if needed
      navigate('/');
    } else {
      console.error('Authentication failed: No token received');
      navigate('/login?error=no_token');
    }
  }, [location, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-[#003366]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B33929] mb-4"></div>
      <h2 className="text-xl font-semibold">Finalizando sesión...</h2>
      <p className="text-gray-500">Por favor espera un momento.</p>
    </div>
  );
};

export default AuthCallback;
