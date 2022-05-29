import { createSelector } from '@reduxjs/toolkit';
import { IStore } from '../store';

export const currentUserInfo = (store: IStore) => store.currentUserReducer;
export const loginCurrentUser = createSelector(
  currentUserInfo,
  ({ login }) => login
);

export const firstNameUser = createSelector(
  currentUserInfo,
  ({ firstName }) => firstName
);
