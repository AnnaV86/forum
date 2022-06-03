import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currentUserInfo } from '../../../../selectors/currentUser';
import { IStore } from '../../../../store';
import { addMessageAction } from '../../../../store/reducers/message';
import style from './updateProfile.module.css';

interface UpdateProfileProps {
  inputData: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  saveProfile: (evt: React.FormEvent<HTMLFormElement>) => void;
  inputOldPassword: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  inputNewPassword: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  oldPassword: string;
  newPassword: string;
  saveNewPassword: () => void;
}

export const UpdateProfile: FC<UpdateProfileProps> = ({
  inputData,
  saveProfile,
  inputOldPassword,
  inputNewPassword,
  oldPassword,
  newPassword,
  saveNewPassword,
}) => {
  const dispatch = useDispatch();
  const [togglePassword, setTogglePassword] = useState(false);
  const [buttonText, setButtonText] = useState('Изменить пароль');
  const user = useSelector(currentUserInfo);
  const messageAuth = useSelector((store: IStore) => store.messageReducer);

  const savePassword = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (oldPassword === user.password) {
      saveNewPassword();
      setButtonText('Пароль изменен');
      setTogglePassword(false);
    } else {
      dispatch(addMessageAction('Не верный пароль'));
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
  }, [messageAuth]);

  return (
    <>
      <form className={style.wrapper} onSubmit={saveProfile}>
        <input
          type='url'
          name='avatar'
          defaultValue={user.avatar}
          className={style.inputText}
          placeholder='Url аватара'
          onChange={inputData}
          required
          title='Url-адрес'
        />
        <input
          type='text'
          name='firstName'
          defaultValue={user.firstName}
          className={style.inputText}
          placeholder='Имя'
          onChange={inputData}
          required
          pattern='^[a-zA-ZА-Яа-яЁё\s]+$'
          minLength={2}
          title='Кириллица'
        />
        <input
          type='text'
          name='lastName'
          defaultValue={user.lastName}
          className={style.inputText}
          placeholder='Фамилия'
          onChange={inputData}
          required
          pattern='^[a-zA-ZА-Яа-яЁё\s]+$'
          minLength={2}
          title='Кириллица'
        />
        <input
          type='submit'
          className={style.button}
          name='submit'
          value='Сохранить'
        />
      </form>
      {togglePassword ? (
        <>
          <form className={style.wrapper} onSubmit={savePassword}>
            <div className={style.messageAuth}>{messageAuth}</div>
            <input
              type='password'
              value={oldPassword}
              name='oldPassword'
              className={style.inputText}
              placeholder='Введите старый пароль'
              onChange={inputOldPassword}
            />
            <input
              type='password'
              name='newPassword'
              value={newPassword}
              className={style.inputText}
              placeholder='Введите новый пароль'
              onChange={inputNewPassword}
              required
              pattern='[0-9]\w+'
              minLength={6}
            />
            <input
              type='submit'
              className={style.button}
              name='submit'
              value='Сохранить'
            />
          </form>
        </>
      ) : (
        <>
          <div className={style.wrapperPassword}>
            <button
              type='button'
              className={style.button}
              onClick={() => setTogglePassword(true)}
            >
              {buttonText}
            </button>
          </div>
        </>
      )}
    </>
  );
};
