import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { LikeFillIcon } from '../../../../../../../../images/likeFillIcon';
import { LikeLineIcon } from '../../../../../../../../images/likeLineIcon';
import { currentUserInfo } from '../../../../../../../../selectors/currentUser';
import { IAnswer } from '../../../../../../../../store';
import { AdminPage } from '../../../AdminPage/AdminPage';
import { PopupDelete } from '../../../PopupDelete/PopupDelete';
import style from './answerPost.module.css';

interface IAnswerPost {
  comment: IAnswer;
  commentAnswer: any;
  deleteAnswer: any;
  updateAnswer: any;
}

export const AnswerPost: FC<IAnswerPost> = ({
  comment,
  commentAnswer,
  deleteAnswer,
  updateAnswer,
}) => {
  const [updateComment, setUpdateComment] = useState(comment);
  const login = localStorage.getItem('login');
  const user = useSelector(currentUserInfo);
  const [toggle, setToggle] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupDeleteOpen, setPopupDeleteOpen] = useState(false);
  const [userBan, setUserBan] = useState('');

  const inputPost = (evt: any) => {
    const { name, value } = evt.target;
    setUpdateComment((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const banUser = () => {
    const user = comment.login;
    setPopupOpen(true);
    setUserBan(user);
  };

  const closePopup = () => {
    setPopupOpen(false);
    setUserBan('');
  };

  const closePopupDelete = () => {
    setPopupDeleteOpen(false);
  };

  const clickSaveUpdate = () => {
    updateAnswer(updateComment);
    setToggle(false);
  };

  const clickLike = (comment: any) => {
    if (!comment.likes.includes(`${login}`)) {
      const newComment: IAnswer = {
        ...updateComment,
        likes: updateComment.likes.concat(`${login}`),
      };
      setUpdateComment(newComment);
      updateAnswer(newComment);
    } else {
      const newComment = {
        ...updateComment,
        likes: updateComment.likes.filter((like) => like !== `${login}`),
      };
      setUpdateComment(newComment);
      updateAnswer(newComment);
    }
  };

  return (
    <>
      <div>
        <div className={style.wrapper}>
          {' '}
          <div className={style.container}>
            {' '}
            <img
              className={style.avatar}
              src={comment.avatar}
              alt='Фото профиля'
            />
            <h2
              className={style.commentAuthor}
              onClick={() => commentAnswer(comment.author)}
            >
              {comment.author}
            </h2>
          </div>
          {user.role === 'admin' && (
            <h2 className={style.commentLogin} onClick={() => banUser()}>
              ({comment.login})
            </h2>
          )}
        </div>

        {toggle ? (
          <>
            <textarea
              className={style.commentInputText}
              name='text'
              value={updateComment.text}
              onChange={inputPost}
            />
            <button
              type='button'
              className={style.buttonSave}
              onClick={() => clickSaveUpdate()}
            >
              Изменить
            </button>
          </>
        ) : (
          <p className={style.commentText}>{comment.text}</p>
        )}
      </div>
      {user.role === 'admin' && (
        <button
          type='button'
          className={style.buttonDeleteAnswer}
          onClick={() => setPopupDeleteOpen(true)}
        ></button>
      )}
      {login === comment.login && (
        <>
          <button
            type='button'
            className={style.buttonUpdateAnswer}
            onClick={() => setToggle(true)}
          ></button>
          <button
            type='button'
            className={style.buttonDeleteAnswer}
            onClick={() => setPopupDeleteOpen(true)}
          ></button>
        </>
      )}
      <div className={style.like}>
        <div className={style.likeButton} onClick={() => clickLike(comment)}>
          {comment.likes.includes(`${login}`) ? (
            <LikeFillIcon />
          ) : (
            <LikeLineIcon />
          )}
        </div>
        <p className={style.likeCount}>{comment.likes.length}</p>
      </div>
      {popupOpen && (
        <AdminPage banUserLogin={userBan} closePopup={closePopup} />
      )}
      {popupDeleteOpen && (
        <PopupDelete
          id={comment.id}
          deleteCard={deleteAnswer}
          closePopupDelete={closePopupDelete}
        />
      )}
    </>
  );
};
