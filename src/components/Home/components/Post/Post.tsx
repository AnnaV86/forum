import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import style from './post.module.css';
import { PostText } from './components/PostText/PostText';
import { IPost } from '../../../../store';
import { editPostThunk } from '../../../../store/actionsThunk';
import { LikeFillIcon } from '../../../../images/likeFillIcon';
import { LikeLineIcon } from '../../../../images/likeLineIcon';
import { AnswerIcon } from '../../../../images/answerIcon';
import { currentUserInfo } from '../../../../selectors/currentUser';
import { AdminPage } from './components/AdminPage/AdminPage';
import { PopupDelete } from './components/PopupDelete/PopupDelete';

interface IPostProps {
  post: any;
  deleteCard: any;
}
export const Post: FC<IPostProps> = ({ post, deleteCard }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const login = localStorage.getItem('login');
  const [editPost, setEditPost] = useState(post);
  const [activeLike, setActiveLike] = useState(false);
  const [toggle, setToggle] = useState(false);
  const user = useSelector(currentUserInfo);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupDeleteOpen, setPopupDeleteOpen] = useState(false);
  const [userBan, setUserBan] = useState('');

  const clickOpenPost = () => {
    navigate(`/openPost/${post.id}`);
  };

  const clickEditPost = () => {
    setToggle(true);
  };

  const clickSaveEditPost = (updatePost: IPost) => {
    setEditPost(updatePost);
    dispatch(editPostThunk(updatePost));
    setToggle(false);
  };

  const banUser = () => {
    const user = editPost.author;
    setPopupOpen(true);
    setUserBan(user);
  };

  const closePopup = () => {
    setPopupOpen(false);
    setUserBan('');
  };

  const closePopupDelete = () => {
    setPopupDeleteOpen(false);
  };

  const clickLike = () => {
    if (!activeLike) {
      const newPost = {
        ...post,
        likes: post.likes.concat(`${login}`),
      };
      setEditPost(newPost);
      dispatch(editPostThunk(newPost));
      setActiveLike(true);
    } else {
      const newPost = {
        ...post,
        likes: post.likes.filter((el: string) => el !== login),
      };
      setEditPost(newPost);
      dispatch(editPostThunk(newPost));
      setActiveLike(false);
    }
  };

  useEffect(() => {
    if (editPost.likes.includes(`${login}`)) {
      setActiveLike(true);
    }
  }, []);

  return (
    <div className={style.post}>
      <PostText
        post={editPost}
        toggle={toggle}
        clickSaveEditPost={clickSaveEditPost}
        avatar={editPost.avatar}
      />
      <div className={style.infoPost}>
        <div className={style.wrapper}>
          <div className={style.like}>
            <button className={style.likeButton} onClick={clickLike}>
              {' '}
              {activeLike ? <LikeFillIcon /> : <LikeLineIcon />}
            </button>
            <p className={style.likeCount}>{editPost.likes.length}</p>
          </div>
          <div className={style.answer}>
            <AnswerIcon />
            <p className={style.answerCount}>{editPost.answer.length}</p>
          </div>{' '}
        </div>
        {user.role === 'admin' ? (
          <p className={style.authorAdmin} onClick={() => banUser()}>
            {editPost.login}
          </p>
        ) : (
          <p className={style.author}>{editPost.author}</p>
        )}
      </div>

      <button type='button' className={style.discuss} onClick={clickOpenPost}>
        Обсудить
      </button>
      {user.role === 'admin' && (
        <button
          type='button'
          className={style.delete}
          onClick={() => setPopupDeleteOpen(true)}
        >
          Удалить
        </button>
      )}
      {editPost.login === login && (
        <>
          <button
            type='button'
            className={style.editPost}
            onClick={clickEditPost}
          >
            Редактировать
          </button>
          {user.role !== 'admin' && (
            <button
              type='button'
              className={style.delete}
              onClick={() => setPopupDeleteOpen(true)}
            >
              Удалить
            </button>
          )}
        </>
      )}
      {popupOpen && (
        <AdminPage banUserLogin={userBan} closePopup={closePopup} />
      )}
      {popupDeleteOpen && (
        <PopupDelete
          id={post.id}
          deleteCard={deleteCard}
          closePopupDelete={closePopupDelete}
        />
      )}
    </div>
  );
};
