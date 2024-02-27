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
        .then((res) => {
          setCurrentUser({
            name: res.name,
            email: res.email,
            _id: res._id,
          });
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.log(`Ошибка получения данных: ${err.message}`);
        });
    }
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem('_id');
    if (userId) {
      auth
        .checkToken(userId)
        .then((res) => {
          setCurrentUser({
            name: res.name,
            email: res.email,
            _id: res._id,
          });
          setIsLoggedIn(true);
          navigate('/movies');
        })
        .catch((err) => {
          console.log(`Ошибка верификации токена, ${err.message}`);
        });
    }
  }, []);

  function handleLogin({email, password}) {
    //console.log(email, password);
    auth
      .authorize(email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem('_id', res._id);
          setIsLoggedIn(true);
          setCurrentUser({
            name: res.name,
            email: res.email,
            _id: res._id,
          });
          setLoginMessage('Успешная авторизация!');
          setTimeout(() => {
            setLoginMessage('');
            navigate('/movies');
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(`Ошибка авторизации: ${err}`);
        setLoginError(`Ошибка авторизации`);
        setTimeout(() => {
          setLoginError('');
        }, 3000);
      });
  }

  function handleRegister({name, email, password}) {
    //console.log(name, email, password);
    auth
      .register(name, email, password)
      .then((res) => {
        if (res) {
          handleLogin({email, password});
          setRegisterMessage('Успешная регистрация!');
          setTimeout(() => {
            setRegisterMessage('');
            navigate('/movies');
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(`Ошибка регистрации: ${err}`);
        setRegisterError(`Ошибка регистрации`);
        setTimeout(() => {
          setRegisterError('');
        }, 3000);
      });
  }

  function handleUpdateUser(userData) {
    mainApi
      .editUserInfo(userData)
      .then((newUserData) => {
        console.log(newUserData);
        setCurrentUser(newUserData);
        setProfileMessage('Данные пользователя успешно обновлены!');
        setTimeout(() => {
          setProfileMessage('');
        }, 1000);
      })
      .catch((err) => {
        console.log(`Ошибка обновления данных профиля: ${err}`);
        setProfileError(`Ошибка обновления данных профиля`);
        setTimeout(() => {
          setProfileError('');
        }, 3000);
      });
  }

  function handleLogout() {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate('/');
    document.cookie = 'jwt; expires=Thu, 01 Jan 1970 00:00:00 UTC';
    setCurrentUser({name: '', email: '', _id: ''});
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
            <Register handleRegister={handleRegister} registerMessage={registerMessage} registerError={registerError} />
          }
        />

        <Route
          path='/signin'
          element={<Login handleLogin={handleLogin} loginMessage={loginMessage} loginError={loginError} />}
        />

        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
