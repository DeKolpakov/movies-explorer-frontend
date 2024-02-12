import React from 'react';
import myPhoto from '../../../images/portfolio_photo.jpg';

function AboutMe() {
  return (
    <section className='aboutme' id='aboutme'>
      <h3 className='aboutme__title'>Студент</h3>
      <div className='aboutme__container'>
        <div className='aboutme__container-text'>
          <h2 className='aboutme__container-name'>Дени</h2>
          <p className='aboutme__container-profession'>Фронтенд-разработчик, 32 года</p>
          <p className='aboutme__container-description'>
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё
            увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по
            веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a className='aboutme__container-link' href='https://github.com/DeKolpakov' target='_blank' rel='noreferrer'>
            GitHub
          </a>
        </div>
        <img className='aboutme__photo' src={myPhoto} alt='Фото разработчика' />
      </div>
    </section>
  );
}
export default AboutMe;
