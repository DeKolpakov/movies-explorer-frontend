import React from 'react';

function NavTab() {
  return (
    <section className='navtab__container'>
      <a className='navtab__link' href='#about-project'>
        О проекте
      </a>
      <a className='navtab__link' href='#techs'>
        Технологии
      </a>
      <a className='navtab__link' href='#aboutme'>
        Студент
      </a>
    </section>
  );
}

export default NavTab;
