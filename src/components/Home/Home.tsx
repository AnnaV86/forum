import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsFetch } from '../../api';
import { IStore, IPost } from '../../store';
import { deletePostThunk } from '../../store/actionsThunk';
import { getPostAction } from '../../store/reducers/posts';
import style from './home.module.css';
import { Post } from './Post/Post';

export const Home = () => {
  const dispatch: any = useDispatch();
  const postsList = useSelector((state: IStore) => state.postsReducer.posts);

  const deletePost = (id: string) => {
    dispatch(deletePostThunk(id));
  };

  useEffect(() => {
    (async () => {
      const posts = await getPostsFetch();
      dispatch(getPostAction(posts));
    })();
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
