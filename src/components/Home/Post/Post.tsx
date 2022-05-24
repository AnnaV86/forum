import React, { FC, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import style from './post.module.css';

interface IPostProps {
  post: any;
  deleteCard: any;
}
export const Post: FC<IPostProps> = ({ post, deleteCard }) => {
  const navigate = useNavigate();
  const login = localStorage.getItem('login');

  const clickOpenPost = () => {
    navigate(`/openPost/${post.id}`);
  };

  return (
    <div className={style.post}>
      <h2 className={style.title}>{post.title}</h2>
      <p className={style.text}>{post.text}</p>
      <p className={style.author}>{post.author}</p>
      <p className={style.answer}>Ответов: {post.answer.length}</p>
      <button type='button' className={style.discuss} onClick={clickOpenPost}>
        Обсудить
      </button>

      {post.author === login && (
        <button
          type='button'
          className={style.delete}
          onClick={() => deleteCard(post.id)}
        ></button>
      )}
    </div>
  );
};
