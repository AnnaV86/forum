const LOGIN_USER = 'LOGIN_USER';

export function loginUserAction(user: any) {
  return {
    type: LOGIN_USER,
    payload: user,
  };
}

const initialState = {
  login: '',
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
