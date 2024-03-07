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
            Привет! Я - фронтенд разработчик с вдохновляющим путешествием от QA-специалиста к творческому миру
            веб-разработки. Мой опыт включает в себя успешное выполнение заказов по верстке и разработке в течение
            последнего года. Основной фокус моей деятельности — создание удивительных пользовательских интерфейсов для
            веб-приложений. В течение продолжительного периода времени занимался развитием баров, что сформировало мои
            навыки в коммуникации и организации. После этого переориентировался на сферу продаж, где научился эффективно
            продвигать продукты и общаться с клиентами. Пару лет назад решился на изменение своей профессиональной
            траектории, получив дополнительное образование в области QA. Этот этап стал своеобразным "переходом" от
            тестирования к активному участию в процессе создания ПО. Помимо кодинга, я люблю пешие прогулки и
            видео-игры, а так же увлекаюсь коллекционированием винила.
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
