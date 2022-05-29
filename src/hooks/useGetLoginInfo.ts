import { useDispatch } from 'react-redux';
import { loginUserThunk } from '../store/actionsThunk';

export const useGetLoginInfo = () => {
  const dispatch = useDispatch();
  const login = localStorage.getItem('login');

  if (login) {
    dispatch(loginUserThunk(login));
  }
};
