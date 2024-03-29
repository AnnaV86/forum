import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { banUserThunk } from '../../../../../../store/actionsThunk';
import style from './adminPage.module.css';

interface IAdminPageProps {
  banUserLogin: string;
  closePopup: () => void;
}

export const AdminPage: FC<IAdminPageProps> = ({
  banUserLogin,
  closePopup,
}) => {
  const [day, setDay] = useState(0);
  const dispatch = useDispatch();

  const enterDay = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setDay(Number(evt.target.value));
  };

  const acceptBanUser = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(banUserThunk(banUserLogin, day));
    closePopup();
  };

  return (
    <div className={style.popup}>
      <div className={style.wrapper}>
        <h1 className={style.title}>Блокировка пользователя</h1>
        <form className={style.form} name='banUser' onSubmit={acceptBanUser}>
          <p className={style.text}>
            <span className={style.span}>Пользователь: </span> {banUserLogin}
          </p>
          <label>
            Заблокировать на:
            <input
              className={style.input}
              type='number'
              name='banDay'
              value={day}
              onChange={enterDay}
            />
            дней
          </label>
          <input type='submit' value='Заблокировать' className={style.button} />
        </form>
        <button className={style.closeButton} onClick={closePopup}></button>
      </div>
    </div>
  );
};
