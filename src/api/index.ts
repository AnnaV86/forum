import { IUserData } from '../components/Registration/Registration';
import { IPost } from '../store';

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
  console.log(result);
  return result;
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
 * Добавляем нового поста
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
 * Удаление поста
 * @param id
 */
export const deletePostFetch = async (id: string) => {
  const response = await fetch(`http://localhost:3010/posts/${id}`, {
    method: 'DELETE',
  });
  return await response.json();
};
