import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './navBar.module.css';

export const AuthNavBar = () => {
  const activeClassName = style.menuLinkActive;

  return (
    <header className={style.header}>
      <nav className={style.headerMenu}>
        <NavLink
          to='/auth'
          className={({ isActive }) =>
            [
              `${style.menuItem} ${style.menuItemEntry}`,
              isActive ? activeClassName : null,
            ]
              .filter(Boolean)
              .join(' ')
          }
        >
          Вход
        </NavLink>
        <NavLink
          to='/registration'
          className={({ isActive }) =>
            [
              `${style.menuItem} ${style.menuItemRegistration}`,
              isActive ? activeClassName : null,
            ]
              .filter(Boolean)
              .join(' ')
          }
        >
          Регистрация
        </NavLink>
      </nav>
    </header>
  );
};
