import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { useGetLoginInfo } from '../../hooks/useGetLoginInfo';
import { loginCurrentUser } from '../../selectors/currentUser';
import { AuthNavBar } from './components/AuthNavBar';
import { MenuNavBar } from './components/MenuNavBar';

export const NavBar: FC = () => {
  const login = useSelector(loginCurrentUser);
  return <>{login ? <MenuNavBar /> : <AuthNavBar />}</>;
};
