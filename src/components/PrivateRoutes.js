import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CheckUser } from '../reducers/loginuserReducer';
import loginService from '../services/login'


const fetchUser = async () => {
    try {
        await loginService.checkUser()
        
    } catch (error) {
        
    }
    return Promise.resolve()

    }

const PrivateRoutes =  () => {
    
  
    console.log('probando');

    console.log(fetchUser());
    console.log('respuesta');
    const authorized =  fetchUser()
    console.log('respuesta2');
    console.log(authorized);        
 


    return authorized ?  <Outlet /> : <Navigate to="/login" /> ;
    
  };
  
  export { PrivateRoutes };