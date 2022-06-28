import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import style from './registration.module.css';
import { getNewUserThunk } from '../../store/actionsThunk';
import { addMessageAction } from '../../store/reducers/message';
import { IStore } from '../../store';
import { useNavigate } from 'react-router-dom';
import { Path } from '../App/models/paths';

export interface IUserData {
  id: string;
  login: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  banTime: number;
  interview: boolean;
  avatar: string;
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
    banTime: 0,
    interview: false,
    avatar: '',
  });
  const messageAuth = useSelector((store: IStore) => store.messageReducer);

  const inputData = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
      role: 'user',
      id: nanoid(),
    }));
  };

  const enterAuth = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const newUser = await dispatch(getNewUserThunk(userData));
    if (newUser) {
      navigate(Path.auth);
    }
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
  }, [dispatch, messageAuth]);

  useEffect(() => {
    if (login) {
      navigate('/home');
    }
  }, [navigate, login]);

  return (
    <div className={style.registration}>
      <div className={style.messageAuth}>{messageAuth}</div>
      <form className={style.registrationForm} onSubmit={enterAuth}>
        <label>
          Логин:{' '}
          <input
            type='text'
            name='login'
            placeholder='Введите логин'
            onChange={inputData}
            required
            pattern='^[a-zA-Z0-9]+$'
            title='Латинские буквы'
            minLength={3}
          />
        </label>
        <label>
          Пароль:{' '}
          <input
            type='password'
            name='password'
            placeholder='Введите пароль'
            onChange={inputData}
            required
            pattern='[0-9]\w+'
            minLength={6}
          />
        </label>
        <label>
          Имя:{' '}
          <input
            type='text'
            name='firstName'
            placeholder='Введите имя'
            onChange={inputData}
            required
            pattern='^[a-zA-ZА-Яа-яЁё\s]+$'
            minLength={2}
            title='Кириллица'
          />
        </label>
        <label>
          Фамилия:{' '}
          <input
            type='text'
            name='lastName'
            placeholder='Введите Фамилию'
            onChange={inputData}
            required
            pattern='^[a-zA-ZА-Яа-яЁё\s]+$'
            minLength={2}
            title='Кириллица'
          />
        </label>
        <label>
          Аватар:{' '}
          <input
            type='url'
            name='avatar'
            placeholder='Ссылка на ваш аватар'
            onChange={inputData}
            required
            title='url-адрес'
          />
        </label>
        <input
          className={style.inputButton}
          name='submit'
          type='submit'
          value='Зарегистрироваться'
        />
      </form>
    </div>
  );
};
