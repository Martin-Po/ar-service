import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { CheckUser } from '../reducers/loginuserReducer';
import loginService from '../services/login';

const PrivateRoutes = () => {
  const [authorized, setAuthorized] = useState(true);
  const isMountedRef = useRef(false); // Ref para controlar si el componente está montado

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