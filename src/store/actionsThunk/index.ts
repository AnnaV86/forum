import { addUserFetch, getUsersFetch } from '../../api';
import { IAuthData } from '../../components/Auth/Auth';
import { IUserData } from '../../components/Registration/Registration';
import { loginUserAction } from '../reducers/currentUser';
import { addMessageAction } from '../reducers/message';

export function getUserThunk(authData: IAuthData) {
  return async (dispatch: any) => {
    const usersDB: Array<IAuthData> = await getUsersFetch();

    const findUser = usersDB.find(
      (el) => el.login === authData.login && el.password === authData.password
    );
    if (findUser) {
      dispatch(loginUserAction(findUser));
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
