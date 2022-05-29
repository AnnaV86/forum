import { ICurrentUser } from '..';

const LOGIN_USER = 'LOGIN_USER';

export function loginUserAction(user: ICurrentUser) {
  return {
    type: LOGIN_USER,
    payload: user,
  };
}

export const initialStateCurrentUser = {
  id: '',
  login: '',
  password: '',
  firstName: '',
  lastName: '',
  role: '',
};

export const currentUserReducer = (
  state = initialStateCurrentUser,
  action: any
) => {
  switch (action.type) {
    case LOGIN_USER: {
      return action.payload;
    }
    default:
      return state;
  }
};
