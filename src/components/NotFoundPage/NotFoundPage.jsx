import React from 'react';
import {useNavigate} from 'react-router-dom';

function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <section className='notfound'>
      <h1 className='notfound__title'>404</h1>
      <p className='notfound__description'>Страница не найдена</p>
      <button className='notfound__button' onClick={() => navigate(-1)}>
        Назад
      </button>
    </section>
  );
}

export default NotFoundPage;
