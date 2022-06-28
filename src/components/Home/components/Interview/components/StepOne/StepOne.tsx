import React, { FC } from 'react';
import style from './stepOne.module.css';

interface IStepOneProps {
  closeInterview: () => void;
  clickOpenStepTwo: () => void;
  handleMark: (mark: string) => void;
}

export const StepOne: FC<IStepOneProps> = ({
  closeInterview,
  clickOpenStepTwo,
  handleMark,
}) => {
  const click = (evt: any) => {
    handleMark(evt.target.outerText);
    clickOpenStepTwo();
  };

  return (
    <div className={style.container}>
      <h1 className={style.title}>Оцените продукт по 10-балльной шкале</h1>
      <p className={style.text}>
        Какова вероятность, что вы порекомендуете сервис друзьям, коллегам,
        партнерам?
      </p>
      <div className={style.buttons} onClick={(evt) => click(evt)}>
        <div className={style.radioBtn}>
          <input id='1' type='radio' name='1' value='1' />
          <label>1</label>
        </div>
        <div className={style.radioBtn}>
          <input id='2' type='radio' name='2' value='2' />
          <label>2</label>
        </div>
        <div className={style.radioBtn}>
          <input id='3' type='radio' name='3' value='3' />
          <label>3</label>
        </div>
        <div className={style.radioBtn}>
          <input id='4' type='radio' name='4' value='4' />
          <label>4</label>
        </div>
        <div className={style.radioBtn}>
          <input id='5' type='radio' name='5' value='5' />
          <label>5</label>
        </div>
        <div className={style.radioBtn}>
          <input id='6' type='radio' name='6' value='6' />
          <label>6</label>
        </div>
        <div className={style.radioBtn}>
          <input id='7' type='radio' name='7' value='7' />
          <label>7</label>
        </div>
        <div className={style.radioBtn}>
          <input id='8' type='radio' name='8' value='8' />
          <label>8</label>
        </div>
        <div className={style.radioBtn}>
          <input id='9' type='radio' name='9' value='9' />
          <label>9</label>
        </div>
        <div className={style.radioBtn}>
          <input id='10' type='radio' name='10' value='10' />
          <label>10</label>
        </div>
      </div>
      <button
        className={style.close}
        type='button'
        onClick={closeInterview}
      ></button>
    </div>
  );
};
