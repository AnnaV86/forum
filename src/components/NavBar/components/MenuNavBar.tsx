import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { firstNameUser } from '../../../selectors/currentUser';
import {
  initialStateCurrentUser,
  loginUserAction,
} from '../../../store/reducers/currentUser';
import style from './navBar.module.css';

export const MenuNavBar = () => {
  const dispatch = useDispatch();
  const activeClassName = style.menuLinkActive;
  const firstName = useSelector(firstNameUser);

  const outUser = () => {
    localStorage.removeItem('login');
    localStorage.removeItem('role');
    dispatch(loginUserAction(initialStateCurrentUser));
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
          to='/profile'
          className={({ isActive }) =>
            [style.menuItem, isActive ? activeClassName : null]
              .filter(Boolean)
              .join(' ')
          }
        >
          {firstName}
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
