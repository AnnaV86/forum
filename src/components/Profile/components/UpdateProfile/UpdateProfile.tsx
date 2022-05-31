import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ICurrentUser, IStore } from '../../../../store';
import { addMessageAction } from '../../../../store/reducers/message';
import style from './updateProfile.module.css';

interface UpdateProfileProps {
  userData: ICurrentUser;
  inputData: any;
  saveProfile: any;
  inputOldPassword: any;
  inputNewPassword: any;
  oldPassword: string;
  newPassword: string;
  saveNewPassword: any;
}

export const UpdateProfile: FC<UpdateProfileProps> = ({
  userData,
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
  const messageAuth = useSelector((store: IStore) => store.messageReducer);

  const savePassword = () => {
    if (oldPassword === userData.password) {
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
      <div className={style.wrapper}>
        <input
          type='text'
          name='firstName'
          value={userData.firstName}
          className={style.inputText}
          placeholder='Имя'
          onChange={inputData}
        />
        <input
          type='text'
          name='lastName'
          value={userData.lastName}
          className={style.inputText}
          placeholder='Фамилия'
          onChange={inputData}
        />
        <button
          type='button'
          className={style.button}
          onClick={() => saveProfile()}
        >
          Сохранить
        </button>
      </div>
      {togglePassword ? (
        <>
          <div className={style.wrapper}>
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
            />
            <button
              type='button'
              className={style.button}
              onClick={() => savePassword()}
            >
              Сохранить
            </button>
          </div>
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
