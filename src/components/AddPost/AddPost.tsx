import { nanoid } from 'nanoid';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IPost } from '../../store';
import { addNewPostThunk } from '../../store/actionsThunk';
import style from './addPost.module.css';

export const AddPost: FC = () => {
  const dispatch: any = useDispatch();
  const [newPost, setNewPost] = useState<IPost>({
    id: '',
    title: '',
    text: '',
    author: '',
    answer: [],
    likes: [],
  });
  const navigate = useNavigate();
  const login: any = localStorage.getItem('login');

  const inputData = (evt: any) => {
    const { name, value } = evt.target;
    setNewPost((prev) => ({
      ...prev,
      [name]: value,
      author: login,
      id: nanoid(),
    }));
  };

  const handleSubmit = () => {
    dispatch(addNewPostThunk(newPost));
    navigate('/home');
    setNewPost({
      id: '',
      title: '',
      text: '',
      author: '',
      answer: [],
      likes: [],
    });
  };

  useEffect(() => {
    if (login) {
      navigate('/addPost');
    }
  }, [login]);

  return (
    <div className={style.addPost}>
      <h1 className={style.title}>Создать новый пост</h1>
      <form className={style.form}>
        <input
          value={newPost.title}
          type='text'
          name='title'
          className={style.inputTitle}
          placeholder='Заголовок поста'
          required
          onChange={inputData}
        />
        <textarea
          value={newPost.text}
          name='text'
          className={style.text}
          placeholder='Введите текст'
          required
          onChange={inputData}
        />
      </form>
      <button
        className={style.submit}
        type='button'
        onClick={() => handleSubmit()}
      >
        Сохранить
      </button>
    </div>
  );
};
