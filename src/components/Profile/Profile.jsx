import React, {useEffect, useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import Header from '../Header/Header';
import Button from '../Button/Button';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import useFormValidator from '../../utils/useFormValidator';

function Profile({isLoggedIn, handleLogout, handleUpdateUser, profileMessage, profileError}) {
  const currentUser = useContext(CurrentUserContext);
  const validation = useFormValidator();
  const [isChanged, setIsChanged] = useState(false);

  const isFormValid =
    validation.isValid &&
    (validation.values.name !== currentUser.name || validation.values.email !== currentUser.email);

  useEffect(() => {
    validation.setCurrentUserValues(currentUser);
  }, [currentUser]);

  function handleEdit(evt) {
    evt.preventDefault();
    setIsChanged(true);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    handleUpdateUser(validation.values);
    setIsChanged(false);
  }

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <section className='profile'>
        <h1 className='profile__title'>Привет, {currentUser.name}!</h1>

        <form className='profile__form' onSubmit={handleSubmit}>
          <label className='profile__form-input-label' htmlFor='profile-name'>
            Имя
          </label>
          <input
            className='profile__form-input'
            id='name'
            name='name'
            type='name'
            value={validation.values.name ?? currentUser.name ?? ''}
            onChange={(e) => validation.handleChange(e)}
            minLength='2'
            maxLength='40'
            disabled={!isChanged}
            required
          />
          <label className='profile__form-input-label' htmlFor='profile-email'>
            E-mail
          </label>
          <input
            className='profile__form-input'
            id='email'
            name='email'
            type='email'
            value={validation.values.email ?? currentUser.email ?? ''}
            onChange={(e) => validation.handleChange(e)}
            minLength='2'
            maxLength='40'
            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
            disabled={!isChanged}
            required
          />
          <span className='profile__error'>
            {[profileMessage, profileError, validation.errors.name, validation.errors.email].find(Boolean)}
          </span>
          {!isChanged ? (
            <button
              type='button'
              className={`profile__button-edit ${!isFormValid ? 'profile__button-edit_disabled' : ''}`}
              onClick={handleEdit}
            >
              Редактировать
            </button>
          ) : (
            <Button
              buttonId='login__button'
              buttonName='Сохранить'
              additionalClass={isFormValid ? 'button_active' : ''}
              disabled={!isFormValid}
            />
          )}
          <Link className='profile__signout-link' to='/' onClick={handleLogout}>
            Выйти из аккаунта
          </Link>
        </form>
      </section>
    </>
  );
}

export default Profile;
