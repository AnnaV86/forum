import { IUserData } from '../components/Registration/Registration';

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
