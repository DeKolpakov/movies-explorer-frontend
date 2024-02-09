import React from 'react';

function MoviesCard({movie}) {
  const { nameRU, duration, image } = movie;
  return (
    <div className='movies__item'>
      
      <button className='movies__button-save' type='button' aria-label='сохранить'>
        Сохранить
      </button>
      {/* <button className='movies__button-save_active' type='button' aria-label='сохранено'></button>
      <button className='movies__button-delete' type='button' aria-label='удалить'></button> */}

      <img className='movies__img' src={image} alt={`Кадр из фильма ${nameRU}`} />
      <div className='movies__info'>
        <h2 className='movies__title'>{nameRU}</h2>
        <div className='movies__time'>{`${Math.floor(duration / 60)}h${duration % 60}m`}</div>
      </div>
    </div>
  );
}

export default MoviesCard;
