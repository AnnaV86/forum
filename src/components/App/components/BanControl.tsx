import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';

interface BanControlProps {
  children: JSX.Element;
}
export const BanControl: FC<BanControlProps> = ({ children }) => {
  const banTime = Number(localStorage.getItem('banTime'));
  const date = new Date().getTime();

  return banTime < date ? children : <Navigate to='/welcome' />;
};
