import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { editPostThunk } from '../../../store/actionsThunk';
import style from './post.module.css';

interface IPostProps {
  post: any;
  deleteCard: any;
}
export const Post: FC<IPostProps> = ({ post, deleteCard }) => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const login = localStorage.getItem('login');
  const [toggle, setToggle] = useState(false);
  const [editPost, setEditPost] = useState(post);

  const clickOpenPost = () => {
    navigate(`/openPost/${post.id}`);
  };

  const clickEditPost = () => {
    setToggle(true);
  };

  const clickSaveEditPost = () => {
    dispatch(editPostThunk(editPost));
    setToggle(false);
  };

  const inputPost = (evt: any) => {
    const { name, value } = evt.target;
    setEditPost((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={style.post}>
      {toggle ? (
        <form className={style.editForm}>
          <input
            name='title'
            className={style.inputTitle}
            value={editPost.title}
            onChange={inputPost}
          />
          <textarea
            name='text'
            className={style.inputText}
            value={editPost.text}
            onChange={inputPost}
          />
          <button
            type='button'
            className={style.buttonSave}
            onClick={clickSaveEditPost}
          >
            Изменить
          </button>
        </form>
      ) : (
        <>
          <h2 className={style.title}>{editPost.title}</h2>
          <p className={style.text}>{editPost.text}</p>
        </>
      )}
      <p className={style.author}>{editPost.author}</p>
      <p className={style.answer}>Ответов: {editPost.answer.length}</p>
      <button type='button' className={style.discuss} onClick={clickOpenPost}>
        Обсудить
      </button>
      {editPost.author === login && (
        <>
          <button
            type='button'
            className={style.editPost}
            onClick={clickEditPost}
          >
            Редактировать
          </button>
          <button
            type='button'
            className={style.delete}
            onClick={() => deleteCard(post.id)}
          >
            Удалить
          </button>
        </>
      )}
    </div>
  );
};
