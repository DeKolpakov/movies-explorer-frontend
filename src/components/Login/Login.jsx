import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import logo from '../../images/logo.svg';
import Button from '../Button/Button';
import useFormValidator from '../../utils/useFormValidator';

function Login({handleLogin, loginMessage, loginError}) {
  const [isLoading, setIsLoading] = useState(false);
  
  const validation = useFormValidator();
  const isFormValid = validation.isValid;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await handleLogin(validation.values);
    setIsLoading(false);
  };

  return (
    <section className='login'>
      <Link to='/'>
        <img src={logo} alt='Логотип' className='logo logo__login' />
      </Link>
      <h1 className='login__title'>Рады видеть!</h1>
      <form className='login__form' id='login__form' name='login__form' onSubmit={handleSubmit} noValidate>
        <p className='login__input-name'>E-mail</p>
        <input
          className={`login__input ${validation.errors.email ? 'login__input_novalide' : ''}`}
          id='email'
          name='email'
          type='email'
          value={validation.values.email ?? ''}
          onChange={(e) => validation.handleChange(e)}
          minLength='2'
          disabled={isLoading}
          required
        />
        <span className='login__error' id='login__error'>
          {validation.errors.email}
        </span>
        <p className='login__input-name'>Пароль</p>
        <input
          className={`login__input ${validation.errors.password ? 'login__input_novalide' : ''}`}
          id='password'
          name='password'
          type='password'
          value={validation.values.password ?? ''}
          onChange={(e) => validation.handleChange(e)}
          minLength='8'
          disabled={isLoading}
          required
        />
        <span className='login__error' id='login__error'>
          {[validation.errors.password, loginError].find(Boolean)}
        </span>
        <span className='login__message' id='login__message'>
          {loginMessage}
        </span>
        <Button
          buttonId='login__button'
          buttonName='Войти'
          additionalClass={isFormValid ? 'button_active' : ''}
          type='submit'
          disabled={isLoading && !isFormValid}
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
