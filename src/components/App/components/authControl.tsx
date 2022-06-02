import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { BanControl } from './BanControl';

interface AuthControlProps {
  children: JSX.Element;
}
export const AuthControl: FC<AuthControlProps> = ({ children }) => {
  const login = localStorage.getItem('login');
  return login ? <BanControl>{children}</BanControl> : <Navigate to='/auth' />;
};
