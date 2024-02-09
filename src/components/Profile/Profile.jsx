import React from 'react';
import {Link} from 'react-router-dom';
import Header from '../Header/Header';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
/* import Button from '../Button/Button'; */

function Profile({name,email}) {
  return (
    <>
      <Header />
      <section className='profile'>
        <h1 className='profile__title'>Привет, {name}!</h1>

        <form className='profile__form'>
          <label className='profile__form-input-label' for='profile-name'>
            Имя
          </label>
          <input className='profile__form-input' id='profile-name' name='profile-name' type='text' value={name} />
          <label className='profile__form-input-label' for='profile-email'>
            E-mail
          </label>
          <input className='profile__form-input' id='profile-email' name='profile-email' type='text' value={email}/>
        </form>
        <span className='profile__error'></span>

        {/*  <Button buttonId='profile__button' buttonName='Сохранить' /> */}

        <div className='profile__button-edit'>Редактировать</div>
        <Link className='profile__signout-link'>Выйти из аккаунта</Link>
      </section>
      <BurgerMenu />
    </>
  );
}

export default Profile;
