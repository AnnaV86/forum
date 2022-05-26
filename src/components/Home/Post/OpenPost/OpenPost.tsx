import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { getPostsFetch } from '../../../../api';
import { IAnswer, IPost } from '../../../../store';
import style from './openPost.module.css';
import { useDispatch } from 'react-redux';
import { editPostThunk } from '../../../../store/actionsThunk';
import { InfoPost } from './InfoPost/InfoPost';
import { AnswerPost } from './AnswerPost/AnswerPost';

export const OpenPost = () => {
  const [text, setText] = useState('');
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState<IPost>({
    id: '',
    title: '',
    text: '',
    author: '',
    answer: [],
    likes: [],
  });
  const login = localStorage.getItem('login');
  const [newAnswer, setNewAnswer] = useState({
    id: '',
    text: '',
    author: '',
    likes: [],
  });

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

  const commentAnswer = (author: string) => {
    setText(`${author}`);
  };

  const onClickOk = () => {
    const newPost = {
      ...post,
      answer: post.answer.concat(newAnswer),
    };
    setPost(newPost);
    setText('');

    dispatch(editPostThunk(newPost));
  };

  const deleteAnswer = (id: any) => {
    const newPost = {
      ...post,
      answer: post.answer.filter((el) => el.id !== id),
    };
    setPost(newPost);

    dispatch(editPostThunk(newPost));
  };

  const updateAnswer = (comment: IAnswer) => {
     const newPost = {
      ...post,
      answer: post.answer.map((el) => (el.id === comment.id ? comment : el)),
    };
    setPost(newPost);

    dispatch(editPostThunk(newPost));
  };

  const inputData = (evt: any) => {
    const value = evt.target.value;
    setText(value);
    setNewAnswer((prev: any) => ({
      ...prev,
      text: value,
      author: login,
      id: nanoid(),
    }));
  };

  const clickLike = (comment: any) => {
    if (!comment.likes.includes(`${login}`)) {
      const newPost: IPost = {
        ...post,
        answer: post.answer.map((el) =>
          el === comment ? { ...el, likes: el.likes.concat(`${login}`) } : el
        ),
      };
      setPost(newPost);
      dispatch(editPostThunk(newPost));
    } else {
      const newPost = {
        ...post,
        answer: post.answer.map((el) =>
          el === comment
            ? { ...el, likes: el.likes.filter((name) => name !== `${login}`) }
            : el
        ),
      };
      setPost(newPost);
      dispatch(editPostThunk(newPost));
    }
  };

  return (
    <div className={style.post}>
      <InfoPost post={post} />
      <ul className={style.commentsBox}>
        {answer.map((comment: IAnswer) => (
          <li className={style.commentItem} key={comment.id}>
            <AnswerPost
              comment={comment}
              commentAnswer={commentAnswer}
              clickLike={clickLike}
              deleteAnswer={deleteAnswer}
              updateAnswer={updateAnswer}
            />
          </li>
        ))}
      </ul>
      <form className={style.commentForm}>
        <input
          value={text}
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
