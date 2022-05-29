import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';

interface AuthControlProps {
  children: JSX.Element;
}
export const AuthControl: FC<AuthControlProps> = ({ children }) => {
  const login = localStorage.getItem('login');
  return login ? children : <Navigate to='/auth' />;
};
