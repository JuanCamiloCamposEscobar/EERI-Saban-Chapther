import React from 'react';

const LoginButton = () => {
  const handleLogin = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    window.location.href = `${apiUrl}/auth/microsoft`;
  };

  return (
    <button
      onClick={handleLogin}
      className="flex items-center gap-3 px-6 py-2.5 bg-[#003366] hover:bg-[#002244] text-white rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
      style={{ fontFamily: 'Montserrat, sans-serif' }}
    >
      <svg className="w-5 h-5" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg">
        <path fill="#f3f3f3" d="M0 0h11v11H0z" />
        <path fill="#f3f3f3" d="M12 0h11v11H12z" />
        <path fill="#f3f3f3" d="M0 12h11v23H0z" />
        <path fill="#f3f3f3" d="M12 12h11v23H12z" />
        {/* Simplified MS Logo using squares */}
        <rect x="0" y="0" width="10.5" height="10.5" fill="#f25022" />
        <rect x="11.5" y="0" width="10.5" height="10.5" fill="#7fbb00" />
        <rect x="0" y="11.5" width="10.5" height="10.5" fill="#00a1f1" />
        <rect x="11.5" y="11.5" width="10.5" height="10.5" fill="#ffbb00" />
      </svg>
      <span>Iniciar Sesión </span>
    </button>
  );
};

export default LoginButton;
