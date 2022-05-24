import { Navigate } from 'react-router-dom';
import { IPost } from '..';
import {
  addNewPostFetch,
  addUserFetch,
  deletePostFetch,
  getUsersFetch,
} from '../../api';
import { IAuthData } from '../../components/Auth/Auth';
import { IUserData } from '../../components/Registration/Registration';
import { loginUserAction } from '../reducers/currentUser';
import { addMessageAction } from '../reducers/message';
import { deletePostAction, addPostAction } from '../reducers/posts';

export function getUserThunk(authData: IAuthData) {
  return async (dispatch: any) => {
    const usersDB: Array<IAuthData> = await getUsersFetch();

    const findUser = usersDB.find(
      (el) => el.login === authData.login && el.password === authData.password
    );
    if (findUser) {
      localStorage.setItem('login', findUser.login);
      return 'ok';
      // dispatch(loginUserAction(findUser));
    } else {
      dispatch(addMessageAction('Вы ввели не правильный логин или пароль'));
    }
  };
}

export function getNewUserThunk(userData: IUserData) {
  return async (dispatch: any) => {
    const usersDB: Array<IUserData> = await getUsersFetch();

    const findUser = usersDB.find((el) => el.login === userData.login);
    if (findUser) {
      dispatch(addMessageAction('Данный логин уже занят'));
    } else {
      const newUser = await addUserFetch(userData);
      dispatch(loginUserAction(newUser));
    }
  };
}

export function addNewPostThunk(newPost: IPost) {
  return async (dispatch: any) => {
    const post = await addNewPostFetch(newPost);

    dispatch(addPostAction(post));
  };
}

export function deletePostThunk(id: string) {
  return async (dispatch: any) => {
    await deletePostFetch(id);

    dispatch(deletePostAction(id));
  };
}
