import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import style from './welcome.module.css';

export const Welcome: FC = () => {
  return (
    <div className={style.welcome}>
      <h2>
        Добро пожаловать на наш форум!{' '}
        <Link className={style.linkWelcome} to='/auth'>
          Войдите
        </Link>
        , или{' '}
        <Link className={style.linkWelcome} to='/registration'>
          зарегистрируйтесь
        </Link>
      </h2>
    </div>
  );
};
