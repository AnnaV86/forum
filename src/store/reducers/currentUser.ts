import { ICurrentUser } from '..';

export enum actionTypesCurrentUser {
  ADD_INFO_USER = 'ADD_INFO_USER',
}

type AddUserInfoActionType = {
  type: actionTypesCurrentUser.ADD_INFO_USER;
  payload: { user: ICurrentUser };
};

export function addUserInfoAction(user: ICurrentUser) {
  return {
    type: actionTypesCurrentUser.ADD_INFO_USER,
    payload: user,
  };
}

export const initialStateCurrentUser: ICurrentUser = {
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
  state: ICurrentUser = initialStateCurrentUser,
  action: AddUserInfoActionType
) => {
  switch (action.type) {
    case actionTypesCurrentUser.ADD_INFO_USER: {
      return action.payload;
    }

    default:
      return state;
  }
};
