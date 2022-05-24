import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Auth } from '../Auth/Auth';
import { AddPost } from '../AddPost/AddPost';
import { Home } from '../Home/Home';
import { NavBar } from '../NavBar/NavBar';
import { Registration } from '../Registration/Registration';
import { Welcome } from '../Welcome/Welcome';
import { OpenPost } from '../Home/Post/OpenPost/OpenPost';

export const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/auth' element={<Auth />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/home' element={<Home />} />
        <Route path='/addPost' element={<AddPost />} />
        <Route path='/openPost/:id' element={<OpenPost />} />
        <Route path='*' element={<Welcome />} />
      </Routes>
    </BrowserRouter>
  );
};
