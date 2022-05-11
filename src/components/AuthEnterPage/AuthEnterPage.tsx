import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavBar } from '../NavBar/NavBar';
import { Main } from '../Welcome/welcome';
import { Registration } from '../Registration/Registration';
import { addMessageAction } from '../../store/reducers/message';
import { IStore } from '../../store';
import './authEnterPage.module.css';
import { Auth } from '../Auth/Auth';

export const AuthEnterPage: FC = () => {
  const messageAuth = useSelector((store: IStore) => store.messageReducer);
  const [message, setMessage] = useState<string>(
    'Добро пожаловать на наш форум! Войдите, или зарегистрируйтесь'
  );
  const dispatch: any = useDispatch();

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
    <div className='AuthEnterPage'>
      <Main message={message} />
      <div className='messageAuth'>{messageAuth}</div>
      <Auth />
      <Registration />
    </div>
  );
};
