import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import loginService from '../services/login';

const PrivateRoutes = () => {
  const [authorized, setAuthorized] = useState(true);

  useEffect(() => {
    // Función para ejecutar fetchUser solo una vez por renderización
      const fetchUser = async () => {
        try {
          await loginService.checkUser();
          setAuthorized(true);
        } catch (error) {
          setAuthorized(false);
        }
      };
  
      fetchUser();
    }, []);

  return authorized ? <Outlet /> : <Navigate to="/login" />;
};

export { PrivateRoutes };