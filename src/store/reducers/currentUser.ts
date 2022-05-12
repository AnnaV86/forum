const LOGIN_USER = 'LOGIN_USER';

export function loginUserAction(user: any) {
  return {
    type: LOGIN_USER,
    payload: user,
  };
}

export const initialState = {
  id: '',
  login: 'Анюта',
  password: '',
  firstName: '',
  lastName: '',
  role: '',
};

export const currentUserReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOGIN_USER: {
      return action.payload;
    }
    default:
      return state;
  }
};
