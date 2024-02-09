import React from 'react';

function Footer() {
  return (
    <footer className='footer'>
      <p className='footer__description'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className='footer__container'>
        <p className='footer__year'>© {new Date().getFullYear()}</p>
        <div className='footer__links'>
          <a href='https://practicum.yandex.ru' target='_blank' className='footer__link'>
            Яндекс.Практикум
          </a>
          <a href='https://github.com/DeKolpakov' target='_blank' className='footer__link'>
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
