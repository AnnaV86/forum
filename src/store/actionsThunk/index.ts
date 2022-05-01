
import { getUsersFetch } from '../../api';
import { IAuthData } from '../../components/Auth/Auth';
import { loginUserAction } from '../reducers/currentUser';
import { addMessageAction } from '../reducers/message';

export function getUserThunk(authData: IAuthData) {
  return async (dispatch: any) => {
    const usersDB = await getUsersFetch();

    const findUser = usersDB.find(
      (el: any) =>
        el.login === authData.login && el.password === authData.password
    );
    if (findUser) {
      dispatch(loginUserAction(findUser));
    } else {
      dispatch(addMessageAction('Вы ввели не правильный логин или пароль'));
    }
  };
}
