import { ICurrentUser } from '..';

const LOGIN_USER = 'LOGIN_USER';
const UPDATE_USER = 'UPDATE_USER';

export function loginUserAction(user: ICurrentUser) {
  return {
    type: LOGIN_USER,
    payload: user,
  };
}

export function editUserAction(user: ICurrentUser) {
  return {
    type: UPDATE_USER,
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
    case UPDATE_USER: {
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
      };
    }
    default:
      return state;
  }
};
