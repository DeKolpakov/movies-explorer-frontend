import React from 'react';

function Portfolio() {
  return (
    <section className='portfolio'>
      <h3 className='portfolio__title'>Портфолио</h3>
      <a href='https://dekolpakov.github.io/how-to-learn/' className='portfolio__link' target='_blank' rel='noreferrer'>
        Статичный сайт<p className='portfolio__link-symbol'>↗</p>
      </a>
      <a href='https://dekolpakov.github.io/russian-travel/' className='portfolio__link' target='_blank' rel='noreferrer'>
        Адаптивный сайт<p className='portfolio__link-symbol'>↗</p>
      </a>
      <a href='https://github.com/DeKolpakov/mesto-full' className='portfolio__link' target='_blank' rel='noreferrer'>
        Одностраничное приложение<p className='portfolio__link-symbol'>↗</p>
      </a>
    </section>
  );
}

export default Portfolio;
