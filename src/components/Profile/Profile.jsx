import React, {useEffect, useContext, useState} from 'react';
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

  function handleCancel(evt) {
    evt.preventDefault();
    setIsChanged(false);
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
            disabled={!isChanged}
            required
          />
          <span className='profile__error'>
            {[profileError, validation.errors.name, validation.errors.email].find(Boolean)}
          </span>
          <span className='profile__message'>{profileMessage}</span>
          {!isChanged ? (
            <button type='button' className='profile__button-edit' onClick={handleEdit}>
              Редактировать
            </button>
          ) : isFormValid ? (
            <Button
              buttonId='login__button'
              buttonName='Сохранить'
              additionalClass={isFormValid ? 'button_active' : ''}
              type='submit'
              disabled={!isFormValid}
            />
          ) : (
            <Button
              buttonId='login__button'
              buttonName='Отмена'
              additionalClass={isFormValid ? 'button_active' : ''}
              onClick={handleCancel}
              type='button'
              disabled={false}
            />
          )}
          <button className='profile__button-signout' onClick={handleLogout} type='button'>
            Выйти из аккаунта
          </button>
        </form>
      </section>
    </>
  );
}

export default Profile;
