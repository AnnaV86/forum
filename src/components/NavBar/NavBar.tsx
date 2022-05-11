import React, { FC, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './navBar.css';

export const NavBar: FC = () => {
  const [pageMenu, setPageMenu] = useState('auth');

  if (pageMenu === 'auth') {
    return (
      <header className='header'>
        <nav className='header-menu'>
          <NavLink
            to='/enter'
            className='menu-item menu-item__entry'
            activeClassName='menu__link_active'
          >
            Вход
          </NavLink>
          <NavLink
            to='/registration'
            className='menu-item menu-item__registration'
            activeClassName='menu__link_active'
          >
            Регистрация
          </NavLink>
        </nav>
      </header>
    );
  } else {
    <header className='header'>
      <nav className='header-menu'>
        <NavLink
          to='/1'
          className='menu-item'
          activeClassName='menu__link_active'
        >
          1
        </NavLink>
        <NavLink
          to='/2'
          className='menu-item'
          activeClassName='menu__link_active'
        >
          2
        </NavLink>
        <NavLink
          to='/3'
          className='menu-item'
          activeClassName='menu__link_active'
        >
          3
        </NavLink>
        <NavLink
          to='/exit'
          className='menu-item menu-item__exit'
          activeClassName='menu__link_active'
        >
          Выйти
        </NavLink>
      </nav>
    </header>;
  }
};
