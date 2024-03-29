import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { nanoid } from 'nanoid';
import style from './openPost.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { InfoPost } from './components/InfoPost/InfoPost';
import { AnswerPost } from './components/AnswerPost/AnswerPost';
import { IAnswer, IPost } from '../../../../../../store';
import { Path } from '../../../../../App/models/paths';
import { useNavigateControl } from '../../../../../../hooks/useNavigateControl';
import { getPostsFetch } from '../../../../../../api';
import { editPostThunk } from '../../../../../../store/actionsThunk';
import { currentUserInfo } from '../../../../../../selectors/currentUser';

export const OpenPost = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const { id } = useParams();
  const [post, setPost] = useState<IPost>({
    id: '',
    title: '',
    text: '',
    avatar: '',
    author: '',
    login: '',
    answer: [],
    likes: [],
  });
  const login = localStorage.getItem('login') || '';
  const [newAnswer, setNewAnswer] = useState<IAnswer>({
    id: '',
    text: '',
    avatar: '',
    author: '',
    login: '',
    likes: [],
  });

  useNavigateControl(Path.openPost, id);
  const user = useSelector(currentUserInfo);
  useEffect(() => {
    (async () => {
      const posts = await getPostsFetch();
      const post = posts.filter((post: IPost) => post.id === id);
      setPost(post[0]);
    })();
  }, []);

  const answer = post.answer;

  const commentAnswer = (author: string) => {
    setText(`${author},`);
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

  const deleteAnswer = (id: string) => {
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

  const inputData = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setText(value);
    setNewAnswer((prev) => ({
      ...prev,
      text: value,
      avatar: user.avatar,
      author: `${user.firstName} ${user.lastName}`,
      login: login,
      id: nanoid(),
    }));
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
