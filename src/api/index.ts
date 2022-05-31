import { IUserData } from '../components/Registration/Registration';
import { ICurrentUser, IPost } from '../store';

/**
 * Запрашиваем всех пользователей
 */
export const getUsersFetch = async () => {
  const response = await fetch(`http://localhost:3010/users`);
  const result = await response.json();
  return result;
};

/**
 * Добавляем нового пользователя
 */

export const addUserFetch = async (userData: IUserData) => {
  const response = await fetch(`http://localhost:3010/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(userData),
  });
  const result = await response.json();
  return result;
};

/**
 * Редактируем пользователя
 */

export const editUserFetch = async (user: ICurrentUser) => {
  const response = await fetch(`http://localhost:3010/users/${user.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(user),
  });

  return await response.json();
};

/**
 * Запрашиваем все посты
 */
export const getPostsFetch = async () => {
  const response = await fetch(`http://localhost:3010/posts`);
  const result = await response.json();
  return result;
};

/**
 * Добавляем новый поста
 */

export const addNewPostFetch = async (newPost: IPost) => {
  const response = await fetch(`http://localhost:3010/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(newPost),
  });

  return await response.json();
};

/**
 * Редактируем пост
 */

export const editPostFetch = async (post: IPost) => {
  const response = await fetch(`http://localhost:3010/posts/${post.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(post),
  });

  return await response.json();
};

/**
 * Удаление поста
 * @param id
 */
export const deletePostFetch = async (id: string) => {
  const response = await fetch(`http://localhost:3010/posts/${id}`, {
    method: 'DELETE',
  });
  return await response.json();
};
