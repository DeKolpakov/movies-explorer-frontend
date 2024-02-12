import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import BurgerButton from '../BurgerButton/BurgerButton';
import logo from '../../images/logo.svg';

function Header() {
  const location = useLocation();

  return (
    <header className='header'>
      <Link to={'/'}>
        <img src={logo} alt='Логотип' className='logo logo__header' />
      </Link>
      {(location.pathname === '/movies' || location.pathname === '/savedmovies' || location.pathname === '/profile') && <Navigation />}
      {(location.pathname === '/movies' || location.pathname === '/savedmovies' || location.pathname === '/profile') && (
        <Link to='/profile' className='account-button account-button__header'>
          Аккаунт
        </Link>
      )}
      {location.pathname === '/' && (
        <div className='header-profile'>
          <Link to='/signup' className='header__signup-link'>
            Регистрация
          </Link>
          <Link to='/signin' className='header__signin-link'>
            Войти
          </Link>
        </div>
      )}
      {(location.pathname === '/movies' || location.pathname === '/savedmovies' || location.pathname === '/profile') && (
        <BurgerButton />
      )}
    </header>
  );
}

export default Header;
