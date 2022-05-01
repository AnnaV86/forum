import rootReducer from './reducers';
import { Store } from 'redux';
import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';

export interface IStore {
  currentUserReducer: {
    login: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
  };
  messageReducer: string;
}

const store: Store<IStore> = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  devTools: true,
});

export default store;
