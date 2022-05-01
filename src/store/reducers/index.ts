import { combineReducers } from '@reduxjs/toolkit';
import { currentUserReducer } from './currentUser';
import { messageReducer } from './message';

const rootReducer = combineReducers({ currentUserReducer, messageReducer });
export default rootReducer;
