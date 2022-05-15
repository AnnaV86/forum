import { combineReducers } from '@reduxjs/toolkit';
import { currentUserReducer } from './currentUser';
import { messageReducer } from './message';
import { postsReducer } from './posts';

const rootReducer = combineReducers({
  currentUserReducer,
  messageReducer,
  postsReducer,
});
export default rootReducer;
