import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import logo from '../../images/logo.svg';
import Button from '../Button/Button';
import validator from '../../utils/validator';

function Register() {
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
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
    <section className='register'>
      <Link to='/'>
        <img src={logo} alt='Логотип' className='logo logo__register' />
      </Link>

      <h1 className='register__title'>Добро пожаловать!</h1>

      <form className='register__form' id='register__form' name='register__form' onSubmit={handleSubmit} noValidate>
        <p className='register__input-name'>Имя</p>
        <input className={`register__input `} id='name' name='name' type='text' value={state.name} onChange={handleChange} required />

        <p className='register__input-name'>E-mail</p>
        <input
          className={`register__input `}
          id='email'
          name='email'
          type='email'
          value={state.email}
          onChange={handleChange}
          required
        />

        <p className='register__input-name'>Пароль</p>
        <input
          className={`register__input ${!validator.fieldValid('password') ? 'register__input_novalide' : ''}`}
          id='password'
          name='password'
          type='password'
          value={state.password}
          onChange={handleChange}
          required
        />

        <span className='register__span register__span_error' id='register__error'>
          {validator.message('name', state.name, 'required|min:2|max:30')}
          {validator.message('email', state.email, 'required|email')}
          {validator.message('password', state.password, 'required|min:6')}
        </span>
        <Button
          buttonId='register__button'
          buttonName='Зарегистрироваться'
          additionalClass={isFormValid ? 'button_active' : ''}
          disabled={!isFormValid}
        />
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
