import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../Header/Header';
import { Main } from '../Main/Main';
import { Auth } from '../Auth/Auth';
import './App.css';

import { IStore } from '../../store';
import { addMessageAction } from '../../store/reducers/message';

function App() {
  const messageAuth = useSelector((store: IStore) => store.messageReducer);
  const [message, setMessage] = useState<string>('Привет я стейт');
  const dispatch: any = useDispatch();

  useEffect(() => {
    if (messageAuth !== '') {
      const timeOutId = setTimeout(() => {
        dispatch(addMessageAction(''));
      }, 3000);
      return () => {
        clearTimeout(timeOutId);
      };
    }
  }, [messageAuth]);

  return (
    <div className='App'>
      <Header />
      <Main message={message} />
      <div className='messageAuth'>{messageAuth}</div>
      <Auth />
    </div>
  );
}

export default App;
