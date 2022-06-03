import rootReducer from './reducers';
import { Store } from 'redux';
import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';

export interface IAnswer {
  text: string;
  id: string;
  avatar: string;
  author: string;
  login: string;
  likes: Array<string>;
}

export interface IPost {
  id: string;
  title: string;
  text: string;
  avatar: string;
  author: string;
  login: string | null;
  answer: Array<IAnswer>;
  likes: Array<string>;
}

export interface ICurrentUser {
  id: string;
  login: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  banTime: number;
  avatar: string;
}

export interface IStore {
  currentUserReducer: ICurrentUser;
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
