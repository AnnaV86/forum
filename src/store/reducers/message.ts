const ADD_MESSAGE = 'ADD_MESSAGE';

export function addMessageAction(message: string) {
  return {
    type: ADD_MESSAGE,
    payload: message,
  };
}

const initialState = '';

export const messageReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_MESSAGE: {
      return action.payload;
    }
    default:
      return state;
  }
};
