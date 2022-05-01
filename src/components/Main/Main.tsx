import React, { FC } from 'react';
import Title from './Title/Title';
import './Main.css';

interface IMain {
  message: string;
}

export const Main: FC<IMain> = ({ message }) => {
  return (
    <div className='main'>
      <p>{message}</p>
      <Title />
    </div>
  );
};
