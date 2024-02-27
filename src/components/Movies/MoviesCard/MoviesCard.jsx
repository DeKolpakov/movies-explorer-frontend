import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

function MoviesCard({savedCards, card, onCardSave, onCardDelete}) {
  const {pathname} = useLocation();

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (card) {
      const res = savedCards.some((movie) => movie.movieId === card.id);
      setIsSaved(res);
    } else {
      setIsSaved(true);
    }
  }, [savedCards]);

  function handleSave() {
    onCardSave(card);
    setIsSaved(true);
  }

  function handleDelete() {
    const foundCard = savedCards.find((movie) => movie.movieId === card.movieId);
    //console.log(savedCards)
    //console.log(card)
    if (foundCard) {
      const cardId = foundCard._id;
      //console.log(cardId);
      onCardDelete(cardId);
      setIsSaved(false);
    } else {
      console.error('Карточка не найдена');
    }
  }
  return (
    <div className='movies__item'>
      {pathname === '/movies' && (
        <button
          className={isSaved ? 'movies__button-save_active' : 'movies__button-save'}
          type='button'
          aria-label='Сохранить'
          onClick={handleSave}
        >
          {!isSaved ? 'Сохранить' : ''}
        </button>
      )}

      {pathname === '/savedmovies' && (
        <button className='movies__button-delete' type='button' aria-label='Удалить' onClick={handleDelete}></button>
      )}
      <a href={card.trailerLink} alt={`Трейлер к фильму ${card.nameRU}`} target='blank' rel='noreferrer'>
        <img
          className='movies__img'
          src={card.image.url ? `https://api.nomoreparties.co/${card.image.url}` : card.image}
          alt={`Кадр из фильма ${card.nameRU}`}
        />
      </a>
      <div className='movies__info'>
        <h2 className='movies__title'>{card.nameRU}</h2>
        <div className='movies__time'>{`${Math.floor(card.duration / 60)}ч ${card.duration % 60}м`}</div>
      </div>
    </div>
  );
}

export default MoviesCard;
