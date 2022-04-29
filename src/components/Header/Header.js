import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Header.css';

function Header() {
  return (
    <header className='header'>
      <ul className='menu'>
        <li>Вход</li>
        <li>Регистрация</li>
      </ul>
    </header>
  );
}

export default Header;
