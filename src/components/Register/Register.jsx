import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import logo from '../../images/logo.svg';
import Button from '../Button/Button';
import useFormValidator from '../../utils/useFormValidator';

function Register({handleRegister, registerMessage, registerError}) {
  const validation = useFormValidator();
  const isFormValid = validation.isValid;

  const [disabled, setIsDisabled] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    handleRegister(validation.values);
    setIsDisabled(true);
    console.log(disabled);
  }

  return (
    <section className='register'>
      <Link to='/'>
        <img src={logo} alt='Логотип' className='logo logo__register' />
      </Link>

      <h1 className='register__title'>Добро пожаловать!</h1>

      <form className='register__form' id='register__form' name='register__form' onSubmit={handleSubmit} noValidate>
        <p className='register__input-name'>Имя</p>
        <input
          className={`register__input `}
          id='name'
          name='name'
          type='text'
          value={validation.values.name ?? ''}
          onChange={(e) => validation.handleChange(e)}
          minLength='2'
          maxLength='20'
          disabled={disabled}
          required
        />

        <p className='register__input-name'>E-mail</p>
        <input
          className={`register__input `}
          id='email'
          name='email'
          type='email'
          value={validation.values.email ?? ''}
          onChange={(e) => validation.handleChange(e)}
          disabled={disabled}
          required
        />

        <p className='register__input-name'>Пароль</p>
        <input
          className={`register__input ${!isFormValid ? 'register__input_novalide' : ''}`}
          id='password'
          name='password'
          type='password'
          value={validation.values.password ?? ''}
          onChange={(e) => validation.handleChange(e)}
          minLength='8'
          disabled={disabled}
          required
        />

        <span className='register__error' id='register__error'>
          {[
            validation.errors.name,
            validation.errors.email,
            validation.errors.password,
            registerMessage,
            registerError,
          ].find(Boolean)}
        </span>
        <span className='register__message' id='register__message'>
          {registerMessage}
        </span>

        <Button
          buttonId='register__button'
          buttonName='Зарегистрироваться'
          additionalClass={isFormValid ? 'button_active' : ''}
          type='submit'
          disabled={disabled && !isFormValid}
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
