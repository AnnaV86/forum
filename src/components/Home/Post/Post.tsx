import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { deleteCardFetch } from '../../../api';
import { IStore } from '../../../store';
import style from './post.module.css';

interface IPost {
  post: any;
  deleteCard: any;
}

export const Post: FC<IPost> = ({ post, deleteCard }) => {
  const login = useSelector((store: IStore) => store.currentUserReducer.login);

  return (
    <div className={style.post}>
      <h2 className={style.title}>{post.title}</h2>
      <p className={style.text}>{post.text}</p>
      <p className={style.author}>{post.author}</p>
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
