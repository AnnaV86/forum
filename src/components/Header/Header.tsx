import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Header.css';

function Header() {
  return (
    <header className='header'>
      <ul className='header-menu'>
        <li className='entry'>Вход</li>
        <li className='registration'>Регистрация</li>
      </ul>
    </header>
  );
}

export default Header;
