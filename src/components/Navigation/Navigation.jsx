import React from 'react';
import {NavLink} from 'react-router-dom';

function Navigation() {
  return (
    <div className='navigation'>
      <NavLink
        to='/movies'
        className={({isActive}) =>
          isActive ? 'navigation__link navigation__link_active' : 'navigation__link navigation__link_inactive'
        }
      >
        Фильмы
      </NavLink>
      <NavLink
        to='/savedmovies'
        className={({isActive}) =>
          isActive ? 'navigation__link navigation__link_active' : 'navigation__link navigation__link_inactive'
        }
      >
        Сохранённые фильмы
      </NavLink>
    </div>
  );
}

export default Navigation;
