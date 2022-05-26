import React, { FC, useState } from 'react';
import style from './answerPost.module.css';
import { IAnswer } from '../../../../../store';
import { LikeFillIcon } from '../../../../../images/likeFillIcon';
import { LikeLineIcon } from '../../../../../images/likeLineIcon';

interface IAnswerPost {
  comment: IAnswer;
  commentAnswer: any;
  clickLike: any;
  deleteAnswer: any;
  updateAnswer: any;
}

export const AnswerPost: FC<IAnswerPost> = ({
  comment,
  commentAnswer,
  clickLike,
  deleteAnswer,
  updateAnswer,
}) => {
  const [updateComment, setUpdateComment] = useState(comment);
  const login = localStorage.getItem('login');
  const [toggle, setToggle] = useState(false);

  const inputPost = (evt: any) => {
    const { name, value } = evt.target;
    setUpdateComment((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clickSaveUpdate = () => {
    updateAnswer(updateComment);
    setToggle(false);
  };

  return (
    <>
      <div>
        <h2
          className={style.commentAuthor}
          onClick={() => commentAnswer(comment.author)}
        >
          {comment.author}
        </h2>
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

      {login === comment.author && (
        <>
          <button
            type='button'
            className={style.buttonUpdateAnswer}
            onClick={() => setToggle(true)}
          ></button>
          <button
            type='button'
            className={style.buttonDeleteAnswer}
            onClick={() => deleteAnswer(comment.id)}
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
    </>
  );
};
