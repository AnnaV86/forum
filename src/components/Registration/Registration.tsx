import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import style from './registration.module.css';
import { getNewUserThunk } from '../../store/actionsThunk';
import { addMessageAction } from '../../store/reducers/message';
import { IStore } from '../../store';
import { useNavigate } from 'react-router-dom';

export interface IUserData {
  id: string;
  login: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
}

export const Registration: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const login = localStorage.getItem('login');
  const [userData, setUserData] = useState<IUserData>({
    id: '',
    login: '',
    password: '',
    firstName: '',
    lastName: '',
    role: '',
  });
  const messageAuth = useSelector((store: IStore) => store.messageReducer);

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
    if (userData.login && userData.password) {
      dispatch(getNewUserThunk(userData));
    }
    dispatch(addMessageAction('Введите логин и пароль'));
  };
  useEffect(() => {
    if (messageAuth !== '') {
      const timeOutId = setTimeout(() => {
        dispatch(addMessageAction(''));
      }, 3000);
      return () => {
        clearTimeout(timeOutId);
      };
    }
  }, [messageAuth]);

  useEffect(() => {
    if (login) {
      navigate('/home');
    }
  }, [login]);

  return (
    <div className={style.registration}>
      <div className={style.messageAuth}>{messageAuth}</div>
      <div className={style.registrationForm}>
        <input name='login' placeholder='Введите логин' onChange={inputData} />
        <input
          name='password'
          placeholder='Введите пароль'
          onChange={inputData}
        />
        <input
          name='firstName'
          placeholder='Введите имя'
          onChange={inputData}
        />
        <input
          name='lastName'
          placeholder='Введите Фамилию'
          onChange={inputData}
        />
        <button className={style.inputButton} type='button' onClick={enterAuth}>
          Войти
        </button>
      </div>
    </div>
  );
};
