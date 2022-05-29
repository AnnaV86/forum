import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Auth } from '../Auth/Auth';
import { AddPost } from '../AddPost/AddPost';
import { Home } from '../Home/Home';
import { NavBar } from '../NavBar/NavBar';
import { Registration } from '../Registration/Registration';
import { Welcome } from '../Welcome/Welcome';
import { OpenPost } from '../Home/Post/OpenPost/OpenPost';
import { Profile } from '../Profile/Profile';
import { useGetLoginInfo } from '../../hooks/useGetLoginInfo';
import { AuthControl } from './components/authControl';
import { Path } from './models/paths';

export const App = () => {
  useGetLoginInfo();
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path={Path.auth} element={<Auth />} />
        <Route path={Path.registration} element={<Registration />} />
        <Route
          path={Path.home}
          element={
            <AuthControl>
              <Home />
            </AuthControl>
          }
        />
        <Route
          path={Path.addPost}
          element={
            <AuthControl>
              <AddPost />
            </AuthControl>
          }
        />
        <Route
          path={Path.profile}
          element={
            <AuthControl>
              <Profile />
            </AuthControl>
          }
        />
        <Route path={Path.openPost + '/:id'} element={<OpenPost />} />
        <Route path='*' element={<Welcome />} />
      </Routes>
    </BrowserRouter>
  );
};
