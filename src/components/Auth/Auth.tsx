import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUserThunk } from '../../store/actionsThunk';
import './Auth.css';

export interface IAuthData {
  login: string;
  password: string;
}

export const Auth = () => {
  const dispatch: any = useDispatch();
  const [authData, setAuthData] = useState<IAuthData>({
    login: '',
    password: '',
  });

  const inputData = (evt: any) => {
    const { name, value } = evt.target;
    setAuthData((prev) => ({ ...prev, [name]: value }));
  };

  const enterAuth = () => {
    dispatch(getUserThunk(authData));
  };

  return (
    <div>
      <input name='login' placeholder='Введите логин' onChange={inputData} />
      <input
        name='password'
        placeholder='Введите пароль'
        onChange={inputData}
      />
      <button type='button' onClick={enterAuth}>
        Войти
      </button>
    </div>
  );
};
