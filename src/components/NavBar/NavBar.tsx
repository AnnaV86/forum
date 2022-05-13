import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { IStore } from '../../store';
import { AuthNavBar } from './components/AuthNavBar';
import { MenuNavBar } from './components/MenuNavBar';

export const NavBar: FC = () => {
  const login = useSelector((store: IStore) => store.currentUserReducer.login);
  return <>{login === '' ? <AuthNavBar /> : <MenuNavBar />}</>;
};
