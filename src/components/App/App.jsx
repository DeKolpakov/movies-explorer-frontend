import {React} from 'react';
import {Route, Routes} from 'react-router-dom';

import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Main />} />

      <Route path='/movies' element={<Movies />} />

      <Route path='/savedmovies' element={<SavedMovies />} />

      <Route path='/profile' element={<Profile name={'Виталий'} email={'vitalik@ya.ru'} />} />

      <Route path='/signup' element={<Register />} />

      <Route path='/signin' element={<Login />} />

      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
