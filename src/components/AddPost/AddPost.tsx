import { nanoid } from 'nanoid';
import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useNavigateControl } from '../../hooks/useNavigateControl';
import { currentUserInfo } from '../../selectors/currentUser';
import { IPost } from '../../store';
import { addNewPostThunk } from '../../store/actionsThunk';
import { Path } from '../App/models/paths';
import style from './addPost.module.css';

export const AddPost: FC = () => {
  const user = useSelector(currentUserInfo);
  const dispatch = useDispatch();
  const [newPost, setNewPost] = useState<IPost>({
    id: '',
    title: '',
    text: '',
    avatar: '',
    author: '',
    login: '',
    answer: [],
    likes: [],
  });
  const navigate = useNavigate();
  const login = localStorage.getItem('login') || '';

  const inputData = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = evt.target;
    setNewPost((prev) => ({
      ...prev,
      [name]: value,
      avatar: user.avatar,
      author: `${user.firstName} ${user.lastName}`,
      login: login,
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
      avatar: '',
      author: '',
      login: '',
      answer: [],
      likes: [],
    });
  };

  useNavigateControl(Path.addPost);

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
        onClick={handleSubmit}
      >
        Сохранить
      </button>
    </div>
  );
};
