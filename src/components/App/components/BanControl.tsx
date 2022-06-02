import moment from 'moment';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { currentUserInfo } from '../../../selectors/currentUser';
import { IStore } from '../../../store';

interface BanControlProps {
  children: JSX.Element;
}
export const BanControl: FC<BanControlProps> = ({ children }) => {
  const { banTime } = useSelector(currentUserInfo);
  const dateMS = moment().valueOf();
  const isUserBanned = banTime > dateMS;

  return !isUserBanned ? children : <Navigate to='/welcome' />;
};
