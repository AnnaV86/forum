import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthNavBar } from './components/AuthNavBar';
import { MenuNavBar } from './components/MenuNavBar';

export const NavBar: FC = () => {
  const navigate = useNavigate();
  const login = localStorage.getItem('login');

  useEffect(() => {
    if (login) {
      navigate('/home');
    } else {
      navigate('/');
    }
  }, [login]);

  return <>{login ? <MenuNavBar /> : <AuthNavBar />}</>;
};
