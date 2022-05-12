import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IStore } from '../../store';
import { getUserThunk } from '../../store/actionsThunk';
import { addMessageAction } from '../../store/reducers/message';
import style from './auth.module.css';

export interface IAuthData {
  login: string;
  password: string;
}

export const Auth: FC = () => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const [authData, setAuthData] = useState<IAuthData>({
    login: '',
    password: '',
  });
  const messageAuth = useSelector((store: IStore) => store.messageReducer);
  const login = useSelector((store: IStore) => store.currentUserReducer.login);

  const inputData = (evt: any) => {
    const { name, value } = evt.target;
    setAuthData((prev) => ({ ...prev, [name]: value }));
  };

  const enterAuth = () => {
    dispatch(getUserThunk(authData));
  };

  useEffect(() => {
    if (login !== '') {
      navigate('/home');
    }
  }, [login]);

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

  return (
    <>
      <div className={style.messageAuth}>{messageAuth}</div>
      <div className={style.authForm}>
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
    </>
  );
};
