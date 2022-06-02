import React, { FC, useEffect, useState } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { currentUserInfo } from '../../selectors/currentUser';
import style from './welcome.module.css';
import { mileSecondsToText } from '../../utils';

export const Welcome: FC = () => {
  const { login, banTime } = useSelector(currentUserInfo);
  const dateMS = moment().valueOf();
  const isUserBanned = banTime > dateMS;
  const banTimeLeft = banTime - dateMS;
  const [time, setTime] = useState<number>(banTimeLeft);

  useEffect(() => {
    if (isUserBanned) {
      setTime(banTimeLeft);
      const id = setInterval(() => setTime((prev) => prev - 1000), 1000);
      return () => clearInterval(id);
    }
  }, [banTime]);

  return (
    <div className={style.welcome}>
      {isUserBanned ? (
        <div className={style.container}>
          {' '}
          <h2>
            Ваш аккаунт {login} заблокирован, потому что Вы редиска - нехороший
            человек.
            <p className={style.text}>
              Время блокировки закончится через
              {mileSecondsToText(time, banTime, dateMS)}
            </p>
          </h2>
          <div className={style.imgBan}></div>
        </div>
      ) : (
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
      )}
    </div>
  );
};
