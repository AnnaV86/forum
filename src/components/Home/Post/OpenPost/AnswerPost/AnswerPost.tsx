import React, { FC, useState } from 'react';
import style from './answerPost.module.css';
import { IAnswer } from '../../../../../store';
import { LikeFillIcon } from '../../../../../images/likeFillIcon';
import { LikeLineIcon } from '../../../../../images/likeLineIcon';

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
