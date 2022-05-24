import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { getPostsFetch } from '../../../../api';
import { IAnswer } from '../../../../store';
import style from './openPost.module.css';

export const OpenPost = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState({
    id: '',
    title: '',
    text: '',
    author: '',
    answer: [],
  });
  const login = localStorage.getItem('login');
  const [newAnswer, setNewAnswer] = useState({ id: '', text: '', author: '' });

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

  const inputData = (evt: any) => {
    const value = evt.target;
    setNewAnswer((prev: any) => ({
      ...prev,
      text: value,
      author: login,
      id: nanoid(),
    }));
  };

  useEffect(() => {}, [newAnswer]);

  return (
    <div className={style.post}>
      <div className={style.postContainer}>
        <h2 className={style.title}>{post.title}</h2>
        <p className={style.author}>{post.author}</p>
        <p className={style.text}>{post.text}</p>
      </div>
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
        {' '}
        <input
          className={style.commentInput}
          value={newAnswer.text}
          name='text'
          placeholder='Введите текст'
          required
          onChange={inputData}
        />
        <button className={style.commentButton}>Ok</button>
      </form>
    </div>
  );
};
