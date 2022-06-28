import React, { FC } from 'react';
import style from './stepZero.module.css';

interface IStepZeroProps {
  clickOpenStepOne: () => void;
  closeInterview: () => void;
}

export const StepZero: FC<IStepZeroProps> = ({
  clickOpenStepOne,
  closeInterview,
}) => {
  return (
    <div className={style.container}>
      <div className={style.img}></div>
      <h1 className={style.title}>Помогите нам стать лучше</h1>
      <p className={style.text}>
        Поделитесь своими впечатлениями о работе в сервисе. Это займет меньше
        двух минут.
      </p>
      <button className={style.button} type='button' onClick={clickOpenStepOne}>
        Пройти опрос
      </button>
      <button
        className={style.close}
        type='button'
        onClick={closeInterview}
      ></button>
    </div>
  );
};
