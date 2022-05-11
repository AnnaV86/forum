import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthEnterPage } from '../AuthEnterPage/AuthEnterPage';
import { Home } from '../Home/Home';
import { NavBar } from '../NavBar/NavBar';
import './app.module.css';

export const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<AuthEnterPage />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};
