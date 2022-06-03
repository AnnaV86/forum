import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigateControl } from '../../hooks/useNavigateControl';
import { currentUserInfo } from '../../selectors/currentUser';
import { ICurrentUser } from '../../store';
import { updateUserThunk } from '../../store/actionsThunk';
import { Path } from '../App/models/paths';
import { UpdateProfile } from './components/UpdateProfile/UpdateProfile';
import style from './profile.module.css';

export const Profile = () => {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const user = useSelector(currentUserInfo);

  const [userData, setUserData] = useState<ICurrentUser | {}>({});

  useNavigateControl(Path.profile);

  const inputData = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const inputOldPassword = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setOldPassword(evt.target.value);
  };

  const inputNewPassword = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(evt.target.value);
  };

  const saveProfile = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const updateUser = { ...user, ...userData };
    dispatch(updateUserThunk(updateUser));
    setUserData({});
    setToggle(false);
  };

  const saveNewPassword = () => {
    const updateUser = { ...user, password: newPassword };
    dispatch(updateUserThunk(updateUser));
    setOldPassword('');
    setNewPassword('');
  };

  return (
    <div className={style.profile}>
      <h1 className={style.title}>Мой профиль</h1>
      {toggle ? (
        <UpdateProfile
          inputData={inputData}
          saveProfile={saveProfile}
          inputOldPassword={inputOldPassword}
          inputNewPassword={inputNewPassword}
          oldPassword={oldPassword}
          newPassword={newPassword}
          saveNewPassword={saveNewPassword}
        />
      ) : (
        <div className={style.wrapper}>
          <img className={style.avatar} src={user.avatar} alt='Фото профиля' />
          <p className={style.text}>Имя: {user.firstName} </p>
          <p className={style.text}>Фамилия: {user.lastName} </p>
          <p className={style.text}>Логин: {user.login} </p>
          <button
            type='button'
            className={style.button}
            onClick={() => setToggle(true)}
          >
            Редактировать профиль
          </button>
        </div>
      )}
    </div>
  );
};
