import React, { FC, useState } from 'react';
import { IPost } from '../../../../../../store';
import style from './postText.module.css';

interface IPostTextProps {
  post: IPost;
  toggle: boolean;
  clickSaveEditPost: (updatePost: IPost) => void;
  avatar: string;
}
export const PostText: FC<IPostTextProps> = ({
  post,
  toggle,
  clickSaveEditPost,
  avatar,
}) => {
  const [updatePost, setUpdatePost] = useState(post);

  const inputPost = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = evt.target;
    setUpdatePost((prev) => ({
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
            value={updatePost.title}
            onChange={inputPost}
          />
          <textarea
            name='text'
            className={style.inputText}
            value={updatePost.text}
            onChange={inputPost}
          />
          <button
            type='button'
            className={style.buttonSave}
            onClick={() => clickSaveEditPost(updatePost)}
          >
            Изменить
          </button>
        </form>
      ) : (
        <>
          <div className={style.wrapper}>
            <img className={style.avatar} src={avatar} alt='Фото профиля' />
            <h2 className={style.title}>{post.title}</h2>
          </div>

          <p className={style.text}>{post.text}</p>
        </>
      )}
    </>
  );
};
