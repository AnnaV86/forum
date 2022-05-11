import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import './registration.module.css';
import { getNewUserThunk } from '../../store/actionsThunk';

export interface IUserData {
  id: string;
  login: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
}

export const Registration: FC = () => {
  const dispatch: any = useDispatch();
  const [userData, setUserData] = useState<IUserData>({
    id: '',
    login: '',
    password: '',
    firstName: '',
    lastName: '',
    role: '',
  });

  const inputData = (evt: any) => {
    const { name, value } = evt.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
      role: 'user',
      id: nanoid(),
    }));
  };

  const enterAuth = () => {
    dispatch(getNewUserThunk(userData));
  };

  return (
    <div className='registration-form'>
      <input name='login' placeholder='Введите логин' onChange={inputData} />
      <input
        name='password'
        placeholder='Введите пароль'
        onChange={inputData}
      />
      <input name='firstName' placeholder='Введите имя' onChange={inputData} />
      <input
        name='lastName'
        placeholder='Введите Фамилию'
        onChange={inputData}
      />
      <button type='button' onClick={enterAuth}>
        Войти
      </button>
    </div>
  );
};
