import { ICurrentUser, IPost } from '..';
import {
  addNewPostFetch,
  addUserFetch,
  deletePostFetch,
  editPostFetch,
  editUserFetch,
  getPostsFetch,
  getUsersFetch,
} from '../../api';
import { IAuthData } from '../../components/Auth/Auth';
import { IUserData } from '../../components/Registration/Registration';
import {
  banUserAction,
  editUserAction,
  loginUserAction,
} from '../reducers/currentUser';
import { addMessageAction } from '../reducers/message';
import {
  deletePostAction,
  addPostAction,
  editPostAction,
  getPostsAction,
} from '../reducers/posts';
import { Dispatch } from 'redux';

export function getUserThunk(authData: IAuthData) {
  return async (dispatch: Dispatch) => {
    const usersDB: Array<ICurrentUser> = await getUsersFetch();

    const findUser = usersDB.find(
      (el) => el.login === authData.login && el.password === authData.password
    );
    if (findUser) {
      localStorage.setItem('login', findUser.login);
      localStorage.setItem('role', findUser.role);
      return 'ok';
    } else {
      dispatch(addMessageAction('Вы ввели не правильный логин или пароль'));
    }
  };
}

export function updateUserThunk(user: ICurrentUser) {
  return async (dispatch: Dispatch) => {
    const editUser = await editUserFetch(user);

    dispatch(editUserAction(editUser));
  };
}

export function banUserThunk(login: string, day: number) {
  return async (dispatch: Dispatch) => {
    const currentDay = new Date();
    const banTime = currentDay.getTime() + day * 86400000;
    const usersDB: Array<ICurrentUser> = await getUsersFetch();
    const findUser = usersDB.find((el) => el.login === login);
    if (findUser) {
      const newStatusBanUser = { ...findUser, banTime: banTime };
      const editUser = await editUserFetch(newStatusBanUser);
      dispatch(banUserAction(editUser));
    }
  };
}

export const getPostsThunk = () => {
  return async (dispatch: Dispatch) => {
    const posts = await getPostsFetch();
    dispatch(getPostsAction(posts));
  };
};

export function getNewUserThunk(userData: IUserData) {
  return async (dispatch: Dispatch) => {
    const usersDB: Array<IUserData> = await getUsersFetch();

    const findUser = usersDB.find((el) => el.login === userData.login);
    if (findUser) {
      dispatch(addMessageAction('Данный логин уже занят'));
    } else {
      const newUser = await addUserFetch(userData);
      return newUser;
      // dispatch(loginUserAction(newUser));
    }
  };
}

export function addNewPostThunk(newPost: IPost) {
  return async (dispatch: Dispatch) => {
    const post = await addNewPostFetch(newPost);

    dispatch(addPostAction(post));
  };
}

export function deletePostThunk(id: string) {
  return async (dispatch: Dispatch) => {
    await deletePostFetch(id);

    dispatch(deletePostAction(id));
  };
}

export function editPostThunk(post: IPost) {
  return async (dispatch: Dispatch) => {
    const editPost = await editPostFetch(post);

    dispatch(editPostAction(editPost));
  };
}

export const loginUserThunk = (login: string) => {
  return async (dispatch: Dispatch) => {
    const usersDB: Array<IUserData> = await getUsersFetch();
    const user: IUserData = usersDB.filter((el) => el.login === login)[0];

    dispatch(loginUserAction(user));
  };
};
