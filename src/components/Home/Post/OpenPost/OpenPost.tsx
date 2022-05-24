import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { getPostsFetch } from '../../../../api';
import { IAnswer, IPost } from '../../../../store';
import style from './openPost.module.css';
import { useDispatch } from 'react-redux';
import { deletePostThunk, editPostThunk } from '../../../../store/actionsThunk';

export const OpenPost = () => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState<IPost>({
    id: '',
    title: '',
    text: '',
    author: '',
    answer: [],
  });
  const login = localStorage.getItem('login');
  const [newAnswer, setNewAnswer] = useState({ id: '', text: '', author: '' });
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    if (login) {
      navigate(`/openPost/${id}`);
    } else {
      navigate('/auth');
    }
  }, [login]);

  useEffect(() => {
    (async () => {
      const posts = await getPostsFetch();
      const post = posts.filter((post: any) => post.id === id);
      setPost(post[0]);
    })();
  }, []);

  const answer = post.answer;

  const onClickOk = () => {
    const newPost = {
      ...post,
      answer: post.answer.concat(newAnswer),
    };
    setPost(newPost);

    dispatch(editPostThunk(newPost));
  };

  const inputData = (evt: any) => {
    const value = evt.target.value;
    setNewAnswer((prev: any) => ({
      ...prev,
      text: value,
      author: login,
      id: nanoid(),
    }));
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
    setPost((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clickSaveEditPost = () => {
    dispatch(editPostThunk(post));
    setToggle(false);
  };

  return (
    <div className={style.post}>
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
          <h2 className={style.title}>{post.title}</h2>
          <p className={style.author}>{post.author}</p>
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

      {answer.map((comment: IAnswer) => (
        <ul className={style.commentBox} key={comment.id}>
          <li>
            {' '}
            <h2 className={style.commentAuthor}>{comment.author}</h2>
            <p className={style.CommentText}>{comment.text}</p>
          </li>
        </ul>
      ))}
      <form className={style.commentForm}>
        <input
          className={style.commentInput}
          name='text'
          placeholder='Введите текст'
          required
          onChange={inputData}
        />
        <button
          type='button'
          className={style.commentButton}
          onClick={onClickOk}
        >
          Ok
        </button>
      </form>
    </div>
  );
};
