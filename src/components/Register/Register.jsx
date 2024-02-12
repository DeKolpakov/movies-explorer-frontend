import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../../images/logo.svg';
import Button from '../Button/Button';

function Register() {
  return (
    <section className='register'>
      <Link to='/'>
        <img src={logo} alt='Логотип' className='logo logo__register' />
      </Link>

      <h1 className='register__title'>Добро пожаловать!</h1>

      <form className='register__form' id='register__form' name='register__form' method='post' >
        <p className='register__input-name'>Имя</p>
        <input className='register__input' id='name' name='name' type='text' required />

        <p className='register__input-name'>E-mail</p>
        <input className='register__input' id='email' name='email' type='text' required />

        <p className='register__input-name'>Пароль</p>
        <input className='register__input' id='password' name='password' type='text' required />

        <span className='register__span register__span_error' id='register__error'></span>
        <Button buttonId='register__button' buttonName='Зарегистрироваться' />
      </form>
      <div className='register__footer'>
        <p className='register__footer-question'>Уже зарегистрированы?</p>
        <Link className='register__footer-link' to='/signin'>
          Войти
        </Link>
      </div>
    </section>
  );
}

export default Register;
