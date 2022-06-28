import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import style from './stepTree.module.css';

interface IStepTreeProps {
  closeInterview: () => void;
}
export const StepTree: FC<IStepTreeProps> = ({ closeInterview }) => {
  return (
    <div className={style.container}>
      <h1 className={style.title}>Спасибо!</h1>
      <p className={style.text}>
        Мы изучим все отзывы и учтём их в дальнейшей работе.
      </p>
      <button
        className={style.close}
        type='button'
        onClick={closeInterview}
      ></button>
    </div>
  );
};
