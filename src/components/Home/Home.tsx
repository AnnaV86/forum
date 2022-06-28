import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigateControl } from '../../hooks/useNavigateControl';
import { currentUserInfo } from '../../selectors/currentUser';
import { IStore, IPost } from '../../store';
import {
  addFeedbackThunk,
  deletePostThunk,
  getPostsThunk,
  updateUserThunk,
} from '../../store/actionsThunk';
import { Path } from '../App/models/paths';
import { Interview } from './components/Interview/Interview';
import { Post } from './components/Post/Post';
import style from './home.module.css';

export const Home = () => {
  const [openInterview, setOpenInterview] = useState(false);
  const [mark, setMark] = useState('');
  const dispatch = useDispatch();
  const user = useSelector(currentUserInfo);
  const postsList = useSelector((state: IStore) => state.postsReducer.posts);
  console.log(user.interview);

  const deletePost = (id: string) => {
    dispatch(deletePostThunk(id));
  };

  const closeInterview = () => {
    setOpenInterview(false);
  };

  const handleMark = (mark: string) => {
    setMark(mark);
  };

  const sendFeedback = (answer: string) => {
    const feedback = [mark, answer];
    dispatch(addFeedbackThunk(feedback));
    const updateUser = { ...user, interview: true };
    dispatch(updateUserThunk(updateUser));
  };

  useNavigateControl(Path.home);

  useEffect(() => {
    if (!user.interview) {
      const id = setTimeout(() => setOpenInterview(true), 5000);
      return () => {
        clearTimeout(id);
      };
    }
  }, [user.interview]);

  useEffect(() => {
    dispatch(getPostsThunk());
  }, [dispatch]);

  return (
    <div className={style.home}>
      {openInterview && (
        <Interview
          closeInterview={closeInterview}
          handleMark={handleMark}
          sendFeedback={sendFeedback}
        />
      )}
      <h1 className={style.title}>Список постов</h1>
      <ul className={style.listPosts}>
        {postsList.map((post: IPost) => (
          <li key={post.id}>
            <Post post={post} deleteCard={deletePost} />
          </li>
        ))}
      </ul>
    </div>
  );
};
