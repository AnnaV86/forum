import rootReducer from './reducers';
import { Store } from 'redux';
import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';

export interface IAnswer {
  text: string;
  id: string;
  author: string;
}

export interface IPost {
  id: string;
  title: string;
  text: string;
  author: string;
  answer: Array<IAnswer>;
}

export interface IStore {
  currentUserReducer: {
    login: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
  };
  messageReducer: string;
  postsReducer: {
    posts: Array<IPost>;
  };
}

const store: Store<IStore> = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  devTools: true,
});

export default store;
