import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigateControl } from '../../hooks/useNavigateControl';
import { currentUserInfo } from '../../selectors/currentUser';
import { ICurrentUser, IStore } from '../../store';
import { updateUserThunk } from '../../store/actionsThunk';
import { addMessageAction } from '../../store/reducers/message';
import { Path } from '../App/models/paths';
import { IUserData } from '../Registration/Registration';
import { UpdateProfile } from './components/UpdateProfile/UpdateProfile';
import style from './profile.module.css';

export const Profile = () => {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const user = useSelector(currentUserInfo);

  const [userData, setUserData] = useState<ICurrentUser>({
    id: '',
    login: '',
    password: '',
    firstName: '',
    lastName: '',
    role: '',
    banTime: 0,
  });

  useNavigateControl(Path.profile);

  const inputData = (evt: any) => {
    const { name, value } = evt.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const inputOldPassword = (evt: any) => {
    setOldPassword(evt.target.value);
  };

  const inputNewPassword = (evt: any) => {
    setNewPassword(evt.target.value);
  };

  const saveProfile = (evt: any) => {
    evt.preventDefault();
    dispatch(updateUserThunk(userData));
    setToggle(false);
  };

  const saveNewPassword = () => {
    const newUserData = {
      ...userData,
      password: newPassword,
    };
    setUserData(newUserData);
    dispatch(updateUserThunk(newUserData));
    setOldPassword('');
    setNewPassword('');
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setUserData(user);
    }, 1000);
    return () => {
      clearTimeout(timeOutId);
    };
  }, []);

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
