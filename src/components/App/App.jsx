import React, {useState, useEffect} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';

import Main from '../Main/Main';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

import mainApi from '../../utils/MainApi';
import auth from '../../utils/auth';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const [profileMessage, setProfileMessage] = useState('');
  const [profileError, setProfileError] = useState('');

  const [loginMessage, setLoginMessage] = useState('');
  const [loginError, setLoginError] = useState('');

  const [registerMessage, setRegisterMessage] = useState('');
  const [registerError, setRegisterError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('_id');
    if (userId) {
      mainApi
        .getUserInfo()
        .then((userInfo) => {
          setCurrentUser({
            name: userInfo.name,
            email: userInfo.email,
            _id: userInfo._id,
          });
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.log(`Ошибка получения данных: ${err}`);
        });
    }
  }, [navigate]);

  function handleLogin({email, password}) {
    auth
      .authorize(email, password)
      .then((res) => {
        setIsLoggedIn(true);
        localStorage.setItem('_id', res._id);
        localStorage.setItem('loggedIn', true);
        setLoginMessage('Успешная авторизация!');
        setTimeout(() => {
          setLoginMessage('');
          navigate('/movies');
        }, 1000);
      })
      .catch((err) => {
        console.log(`${err}`);
        setLoginError(`Ошибка авторизации`);
        setTimeout(() => {
          setLoginError('');
        }, 3000);
      });
  }

  function handleRegister({name, email, password}) {
    auth
      .register(name, email, password)
      .then(() => {
        setRegisterMessage('Успешная регистрация!');
        handleLogin({email, password});
        setTimeout(() => {
          setRegisterMessage('');
        }, 1000);
      })
      .catch((err) => {
        console.log(`${err}`);
        setRegisterError(`${err}`);
      });
  }

  function handleUpdateUser(userData) {
    mainApi
      .editUserInfo(userData)
      .then((res) => {
        setCurrentUser(res);
        setProfileMessage('Данные пользователя успешно обновлены!');
        setProfileError('');
        setTimeout(() => {
          setProfileMessage('');
        }, 1000);
      })
      .catch((err) => {
        console.log(`Ошибка обновления данных профиля: ${err}`);
        setProfileError(`${err}`);
      });
  }

  function handleLogout() {
    auth.logout();
    localStorage.clear();
    setCurrentUser({name: '', email: '', _id: ''});
    setIsLoggedIn(false);
    navigate('/');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path='/' element={<Main isLoggedIn={isLoggedIn} />} />

        <Route path='/movies' element={<ProtectedRoute element={Movies} isLoggedIn={isLoggedIn} />} />

        <Route path='/savedmovies' element={<ProtectedRoute element={SavedMovies} isLoggedIn={isLoggedIn} />} />

        <Route
          path='/profile'
          element={
            <ProtectedRoute
              element={Profile}
              isLoggedIn={isLoggedIn}
              handleLogout={handleLogout}
              handleUpdateUser={handleUpdateUser}
              profileMessage={profileMessage}
              profileError={profileError}
            />
          }
        />

        <Route
          path='/signup'
          element={
            <Register
              isLoggedIn={isLoggedIn}
              handleRegister={handleRegister}
              registerMessage={registerMessage}
              registerError={registerError}
            />
          }
        />

        <Route
          path='/signin'
          element={
            <Login
              isLoggedIn={isLoggedIn}
              handleLogin={handleLogin}
              loginMessage={loginMessage}
              loginError={loginError}
            />
          }
        />

        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
