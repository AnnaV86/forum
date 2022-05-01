/**
 * Запрашиваем всех пользователей
 */
export const getUsersFetch = async () => {
  const response = await fetch(`http://localhost:3010/users`);
  const result = await response.json();
  return result;
};
