import React from 'react';
import {Link} from 'react-router-dom';

function BurgerMenu() {
  return (
    <div className='burger-menu burger-menu_closed'>
      <div className='burger-menu__container'>
        <div className='burger-menu__close-button'></div>
        <div className='burger-menu__link'>
          <Link className='burger-menu__link_item' to='/'>
            Главная
          </Link>
          <Link className='burger-menu__link_item' to='/movies'>
            Фильмы
          </Link>
          <Link className='burger-menu__link_item' to='/savedmovies'>
            Сохранённые фильмы
          </Link>
        </div>
        <Link className='account-button account-button__burger-menu' to='/profile'>
          Аккаунт
        </Link>
      </div>
    </div>
  );
}
export default BurgerMenu;
