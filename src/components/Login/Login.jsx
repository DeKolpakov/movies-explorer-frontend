import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import logo from '../../images/logo.svg';
import Button from '../Button/Button';

import validator from '../../utils/validator';

function Login() {
  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    e.preventDefault();
    const {name, value} = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    validator.showMessageFor(name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validator.allValid()) {
      console.log('Данные отправлены:', state);
    } else {
      validator.showMessages();
      setState((prevState) => ({...prevState}));
    }
  };

  const isFormValid = validator.allValid();
  return (
    <section className='login'>
      <Link to='/'>
        <img src={logo} alt='Логотип' className='logo logo__login' />
      </Link>

      <h1 className='login__title'>Рады видеть!</h1>

      <form className='login__form' id='login__form' name='login__form' onSubmit={handleSubmit} noValidate>
        <p className='login__input-name'>E-mail</p>
        <input className='login__input' id='email' name='email' type='email' value={state.email} onChange={handleChange} required />

        <p className='login__input-name'>Пароль</p>
        <input
          className={`login__input ${!validator.fieldValid('password') ? 'login__input_novalide' : ''}`}
          id='password'
          name='password'
          type='password'
          value={state.password}
          onChange={handleChange}
          required
        />

        <span className='login__span login__span_error' id='login__error'>
          {validator.message('email', state.email, 'required|email')}
          {validator.message('password', state.password, 'required|min:6')}
        </span>

        <Button
          buttonId='login__button'
          buttonName='Войти'
          additionalClass={isFormValid ? 'button_active' : ''}
          disabled={!isFormValid}
        />
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
