import React, { FC } from 'react';
import style from './welcome.module.css';

export const Welcome: FC = () => {
  return (
    <div className={style.welcome}>
      <h2>Добро пожаловать на наш форум! Войдите, или зарегистрируйтесь</h2>
    </div>
  );
};
