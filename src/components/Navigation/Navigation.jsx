import {React} from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <div className='navigation'>
      <Link to="/movies" className='navigation__link'>Фильмы</Link>
      <Link to="/savedmovies" className='navigation__link'>Сохранённые фильмы</Link>
    </div>
  );
}

export default Navigation;
