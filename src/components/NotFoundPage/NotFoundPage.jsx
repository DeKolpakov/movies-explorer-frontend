import React from 'react';
import {useNavigate} from 'react-router-dom';

import Button from '../Button/Button';
import imgNotFound from '../../images/404.png';

function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <section className='notfound'>
      
      <img className='notfound__image' src={imgNotFound} alt='Сломанный робот' />
      <h1 className='notfound__title'>Страница не найдена</h1>
      <Button
        buttonName={'Назад'}
        buttonId={'notfound'}
        additionalClass={'button_active button_notfound'}
        onClick={() => navigate(-1)}
        type={'button'}
        disabled={false}
      />
    </section>
  );
}

export default NotFoundPage;
