import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { IPost } from '../../../../../store';
import {
  deletePostThunk,
  editPostThunk,
} from '../../../../../store/actionsThunk';
import style from './infoPost.module.css';

interface InfoPostProps {
  post: IPost;
}
export const InfoPost: FC<InfoPostProps> = ({ post }) => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [postData, setPostData] = useState<IPost>(post);
  const login = localStorage.getItem('login');

  const clickSaveEditPost = () => {
    dispatch(editPostThunk(postData));
    setToggle(false);
  };

  const deletePost = () => {
    dispatch(deletePostThunk(post.id));
    navigate('/home');
  };

  const clickEditPost = () => {
    setToggle(true);
  };

  const inputPost = (evt: any) => {
    const { name, value } = evt.target;
    setPostData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      {toggle ? (
        <form className={style.editForm}>
          <input
            name='title'
            className={style.inputTitle}
            value={post.title}
            onChange={inputPost}
          />
          <textarea
            name='text'
            className={style.inputText}
            value={post.text}
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
        <div className={style.postContainer}>
          <p className={style.author}>{post.author}</p>
          <h2 className={style.title}>{post.title}</h2>
          <p className={style.text}>{post.text}</p>
          {post.author === login && (
            <div className={style.buttons}>
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
                onClick={deletePost}
              >
                Удалить
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};
