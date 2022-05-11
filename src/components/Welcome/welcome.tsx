import React, { FC } from 'react';
import './welcome.module.css';

interface IMain {
  message: string;
}

export const Main: FC<IMain> = ({ message }) => {
  return (
    <div className='main'>
      <p>{message}</p>
    </div>
  );
};
