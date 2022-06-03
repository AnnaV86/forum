import React, { FC } from 'react';
import style from './popup.module.css';

interface PopupDeleteProps {
  id: string;
  deleteCard: (id: string) => void;
  closePopupDelete: () => void;
}
export const PopupDelete: FC<PopupDeleteProps> = ({
  id,
  deleteCard,
  closePopupDelete,
}) => {
  const acceptDeletePost = () => {
    deleteCard(id);
    closePopupDelete();
  };

  return (
    <div className={style.popup}>
      <div className={style.wrapper}>
        <h1 className={style.title}>Удалить пост?</h1>
        <div className={style.wrapperButton}>
          {' '}
          <button className={style.button} onClick={acceptDeletePost}>
            Да
          </button>
          <button className={style.button} onClick={closePopupDelete}>
            Нет
          </button>
        </div>
      </div>
    </div>
  );
};
