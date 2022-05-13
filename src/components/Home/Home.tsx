import React, { useEffect, useState } from 'react';
import { deleteCardFetch, getPostsFetch } from '../../api';
import style from './home.module.css';
import { Post } from './Post/Post';

export const Home = () => {
  const [postsList, setPostsList] = useState([]);

  const deleteCard = (id: any) => {
    deleteCardFetch(id);
  };

  useEffect(() => {
    (async () => {
      const posts = await getPostsFetch();
      setPostsList(posts);
    })();
  }, []);

  return (
    <div className={style.home}>
      <h1 className={style.title}>Список постов</h1>
      <ul className={style.listPosts}>
        {postsList.map((post: any) => (
          <li key={post.id}>
            <Post post={post} deleteCard={deleteCard} />
          </li>
        ))}
      </ul>
    </div>
  );
};
