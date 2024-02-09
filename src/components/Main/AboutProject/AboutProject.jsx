import React from 'react';

function AboutProject() {
  return (
    <section className='about-project' id='about-project'>
      <h3 className='about-project__title'>О проекте</h3>

      <div className='about-project__description'>
        <div className='about-project__description-item'>
          <h3 className='about-project__description-title'>Дипломный проект включал 5 этапов</h3>
          <p className='about-project__description-text'>
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
          </p>
        </div>

        <div className='about-project__description-item'>
          <h3 className='about-project__description-title'>На выполнение диплома ушло 5 недель</h3>
          <p className='about-project__description-text'>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>

      <div className='about-project__scale'>
        <div className='about-project__scale-item'>1 неделя</div>
        <div className='about-project__scale-item'>4 недели</div>
      </div>

      <div className='about-project__scale-signature'>
        <p className='about-project__scale-text'>Back-end</p>
        <p className='about-project__scale-text'>Front-end</p>
      </div>
    </section>
  );
}

export default AboutProject;
