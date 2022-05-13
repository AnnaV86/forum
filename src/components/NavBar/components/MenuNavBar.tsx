import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  initialState,
  loginUserAction,
} from '../../../store/reducers/currentUser';
import style from './navBar.module.css';

export const MenuNavBar = () => {
  const dispatch: any = useDispatch();
  const activeClassName = style.menuLinkActive;

  const outUser = () => {
    dispatch(loginUserAction(initialState));
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
