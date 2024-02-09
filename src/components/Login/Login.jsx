import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../../images/logo.svg';
import Button from '../Button/Button';

function Login() {
  return (
    <section className='login'>
      <Link to='/'>
        <img src={logo} alt='Логотип' className='logo login__logo' />
      </Link>

      <h1 className='login__title'>Рады видеть!</h1>

      <form className='login__form' id='login__form' name='login__form' noValidate method='post'>
        <p className='login__input-name'>E-mail</p>
        <input className='login__input' id='email' name='email' type='text' required />

        <p className='login__input-name'>Пароль</p>
        <input className='login__input' id='password' name='password' type='text' required />
        <span className='login__span login__span_error' id='password_error'></span>

        <Button buttonId='login__button' buttonName='Войти' />
      </form>
      <div className='login__footer'>
        <p className='login__footer-question'>Ещё не зарегистрированы?</p>
        <Link className='login__footer-link' to='/signup'>
          Регистрация
        </Link>
      </div>
    </section>
  );
}
export default Login;
