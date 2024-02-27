import React, {useState} from 'react';
import {Link, useLocation} from 'react-router-dom';

import logo from '../../images/logo.svg';

import Navigation from '../Navigation/Navigation';
import BurgerButton from '../BurgerButton/BurgerButton';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

function Header({isLoggedIn}) {
  const location = useLocation();

  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  const handleBurgerMenuClick = () => {
    setIsBurgerMenuOpen(true);
  };
  function closeBurgerMenu() {
    setIsBurgerMenuOpen(false);
  }

  return (
    <>
      <header className='header'>
        <Link to={'/'}>
          <img src={logo} alt='Логотип' className='logo logo__header' />
        </Link>

        {isLoggedIn && <Navigation />}

        {isLoggedIn && (
          <Link to='/profile' className='account-button account-button__header'>
            Аккаунт
          </Link>
        )}

        {!isLoggedIn && location.pathname === '/' && (
          <div className='header-profile'>
            <Link to='/signup' className='header__signup-link'>
              Регистрация
            </Link>
            <Link to='/signin' className='header__signin-link'>
              Войти
            </Link>
          </div>
        )}

        <BurgerButton onBurgerMenu={handleBurgerMenuClick} />
      </header>
      <BurgerMenu isBurgerMenuOpen={isBurgerMenuOpen} onClose={closeBurgerMenu} />
    </>
  );
}

export default Header;
