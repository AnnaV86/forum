import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './navBar.module.css';

export const MenuNavBar = () => {
  const activeClassName = style.menuLinkActive;
  const login = localStorage.getItem('login');

  const outUser = () => {
    localStorage.removeItem('login');
  };

  return (
    <header className={style.header}>
      <nav className={style.headerMenu}>
        <NavLink
          to='/home'
          className={({ isActive }) =>
            [style.menuItem, isActive ? activeClassName : null]
              .filter(Boolean)
              .join(' ')
          }
        >
          Главная
        </NavLink>
        <NavLink
          to='/addPost'
          className={({ isActive }) =>
            [style.menuItem, isActive ? activeClassName : null]
              .filter(Boolean)
              .join(' ')
          }
        >
          Создать пост
        </NavLink>
        <div>{login}</div>
        <NavLink
          to='/'
          className={({ isActive }) =>
            [
              `${style.menuItem} ${style.menuItemExit}`,
              isActive ? activeClassName : null,
            ]
              .filter(Boolean)
              .join(' ')
          }
          onClick={outUser}
        >
          Выйти
        </NavLink>
      </nav>
    </header>
  );
};
