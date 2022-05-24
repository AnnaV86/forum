import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './navBar.module.css';

export const AuthNavBar = () => {
  const activeClassName = style.menuLinkActive;
  const classNameFactory = (isActive: boolean, className: string) =>
    [className, isActive ? activeClassName : null].filter(Boolean).join(' ');

  return (
    <header className={style.header}>
      <nav className={style.headerMenu}>
        <NavLink
          to='/auth'
          className={({ isActive }) =>
            classNameFactory(
              isActive,
              `${style.menuItem} ${style.menuItemEnter}`
            )
          }
        >
          Вход
        </NavLink>
        <NavLink
          to='/registration'
          className={({ isActive }) =>
            classNameFactory(
              isActive,
              `${style.menuItem} ${style.menuItemRegistration}`
            )
          }
        >
          Регистрация
        </NavLink>
      </nav>
    </header>
  );
};
