import { ICurrentUser } from '..';

const ADD_INFO_USER = 'ADD_INFO_USER';

export function addUserInfoAction(user: ICurrentUser) {
  return {
    type: ADD_INFO_USER,
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
  banTime: 0,
  avatar: '',
};

export const currentUserReducer = (
  state = initialStateCurrentUser,
  action: any
) => {
  switch (action.type) {
    case ADD_INFO_USER: {
      return action.payload;
    }

    default:
      return state;
  }
};
