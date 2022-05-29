import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Path } from '../components/App/models/paths';

export const useNavigateControl = (path: Path, id?: string) => {
  const navigate = useNavigate();
  const login = localStorage.getItem('login');
  const postId = id ? `/${id}` : '';

  useEffect(() => {
    if (login) {
      navigate(`${path}` + postId);
    } else {
      navigate(Path.auth);
    }
  }, []);
};
