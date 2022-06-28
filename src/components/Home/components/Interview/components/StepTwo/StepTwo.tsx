import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import style from './stepTwo.module.css';

interface IStepTwoProps {
  closeInterview: () => void;
  clickOpenStepTree: () => void;
  sendFeedback: (answer: string) => void;
}

export const StepTwo: FC<IStepTwoProps> = ({
  closeInterview,
  clickOpenStepTree,
  sendFeedback,
}) => {
  const [answer, setAnswer] = useState('');

  const newAnswer = (evt: any) => {
    setAnswer(evt.target.value);
  };

  const clickAnswer = () => {
    clickOpenStepTree();
    sendFeedback(answer);
  };

  return (
    <div className={style.container}>
      <h1 className={style.title}>Расскажите подробнее</h1>
      <p className={style.text}>
        Напишите, пожалуйста, почему вы дали такую оценку. Это поможет нам
        сделать сервис лучше.
      </p>
      <label className={style.label}>Комментарий</label>
      <textarea
        className={style.input}
        value={answer}
        placeholder='Введите текст...'
        onChange={(evt) => newAnswer(evt)}
      />
      <button className={style.button} type='button' onClick={clickAnswer}>
        Отправить отзыв
      </button>
      <button
        className={style.close}
        type='button'
        onClick={closeInterview}
      ></button>
    </div>
  );
};
