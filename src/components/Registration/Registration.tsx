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
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<IUserData>({
    id: '',
    login: '',
    password: '',
    firstName: '',
    lastName: '',
    role: '',
  });
  const messageAuth = useSelector((store: IStore) => store.messageReducer);
  const login = useSelector((store: IStore) => store.currentUserReducer.login);

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
    if (login !== '') {
      navigate('/home');
    }
  }, [login]);

  return (
    <>
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
        <button type='button' onClick={enterAuth}>
          Войти
        </button>
      </div>
    </>
  );
};
