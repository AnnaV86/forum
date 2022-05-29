import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginCurrentUser } from '../../selectors/currentUser';
import style from './welcome.module.css';

export const Welcome: FC = () => {
  const login = useSelector(loginCurrentUser);

  return (
    <div className={style.welcome}>
      <h2>
        Добро пожаловать на наш форум!{' '}
        {!login && (
          <>
            <Link className={style.linkWelcome} to='/auth'>
              Войдите
            </Link>
            , или{' '}
            <Link className={style.linkWelcome} to='/registration'>
              зарегистрируйтесь
            </Link>
          </>
        )}
      </h2>
    </div>
  );
};
