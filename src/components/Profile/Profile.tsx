import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigateControl } from '../../hooks/useNavigateControl';
import { currentUserInfo } from '../../selectors/currentUser';
import { Path } from '../App/models/paths';
import style from './profile.module.css';

export const Profile = () => {
  const user = useSelector(currentUserInfo);

  useNavigateControl(Path.profile);

  return (
    <>
      <div>Имя: {user.firstName} </div>
      <div>Фамилия: {user.lastName} </div>
      <div>Логин: {user.login} </div>
      <div>Пароль: {user.password} </div>
      <div>Роль: {user.role} </div>
    </>
  );
};
