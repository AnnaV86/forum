import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useNavigateControl } from '../../hooks/useNavigateControl';
import { IStore } from '../../store';
import { getUserThunk, loginUserThunk } from '../../store/actionsThunk';
import { addMessageAction } from '../../store/reducers/message';
import { Path } from '../App/models/paths';
import style from './auth.module.css';

export interface IAuthData {
  login: string;
  password: string;
}

export const Auth: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [authData, setAuthData] = useState<IAuthData>({
    login: '',
    password: '',
  });
  const messageAuth = useSelector((store: IStore) => store.messageReducer);

  const inputData = (evt: any) => {
    const { name, value } = evt.target;
    setAuthData((prev) => ({ ...prev, [name]: value }));
  };

  const enterAuth = async () => {
    const response = await dispatch(getUserThunk(authData));
    if (response === 'ok') {
      dispatch(loginUserThunk(authData.login));
      navigate('/home');
    }
  };
  useNavigateControl(Path.home);
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
    <div className={style.auth}>
      <div className={style.messageAuth}>{messageAuth}</div>
      <div className={style.authForm}>
        <input
          className={style.inputForm}
          name='login'
          placeholder='Введите логин'
          onChange={inputData}
        />
        <input
          className={style.inputForm}
          name='password'
          placeholder='Введите пароль'
          onChange={inputData}
        />
        <button className={style.inputButton} type='button' onClick={enterAuth}>
          Войти
        </button>
      </div>
    </div>
  );
};
