import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigateControl } from '../../hooks/useNavigateControl';
import { IStore, IPost } from '../../store';
import { deletePostThunk, getPostsThunk } from '../../store/actionsThunk';
import { Path } from '../App/models/paths';
import { Post } from './components/Post/Post';
import style from './home.module.css';

export const Home = () => {
  const dispatch = useDispatch();
  const postsList = useSelector((state: IStore) => state.postsReducer.posts);

  const deletePost = (id: string) => {
    dispatch(deletePostThunk(id));
  };

  useNavigateControl(Path.home);

  useEffect(() => {
    dispatch(getPostsThunk());
  }, []);

  return (
    <div className={style.home}>
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
