import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import useResize from 'use-resize';
import MoviesCard from '../MoviesCard/MoviesCard';

import {
  START_QUANTITI_MOVIES_L,
  START_QUANTITI_MOVIES_M,
  START_QUANTITI_MOVIES_S,
  ADD_MOVIE_L,
  ADD_MOVIE_M,
  WIDTH_SIZE_L,
  WIDTH_SIZE_M,
} from '../../../utils/constants';

function MoviesCardList({cards, savedCards, onCardSave, onCardDelete}) {
  const {pathname} = useLocation();
  const size = useResize();
  const [items, setItems] = useState([]);
  const [addMore, setAddMore] = useState(ADD_MOVIE_L);
  const [startItem, setStartItem] = useState(START_QUANTITI_MOVIES_L);

  useEffect(() => {
    if (pathname === '/movies') {
      if (size.width > WIDTH_SIZE_L) {
        setStartItem(START_QUANTITI_MOVIES_L);
        setAddMore(ADD_MOVIE_L);
      } else if (size.width > WIDTH_SIZE_M) {
        setStartItem(START_QUANTITI_MOVIES_M);
        setAddMore(ADD_MOVIE_M);
      } else {
        setStartItem(START_QUANTITI_MOVIES_S);
        setAddMore(ADD_MOVIE_M);
      }
    } else {
      setStartItem(savedCards.length);
    }
  }, [size, pathname, savedCards.length]);

  useEffect(() => {
    const resetCards = () => {
      setItems(cards.slice(0, startItem));
    };
    resetCards();
  }, [size, startItem, cards]);

  const handleButtonMore = () => {
    setItems((prevItems) => [...prevItems, ...cards.slice(prevItems.length, prevItems.length + addMore)]);
  };

  return (
    <>
      <div className='movies__card-list'>
        {items.map((card) => (
          <MoviesCard
            savedCards={savedCards}
            card={card}
            key={card.id ? card.id : card.movieId}
            onCardSave={onCardSave}
            onCardDelete={onCardDelete}
          />
        ))}
      </div>
      {items.length < cards.length && pathname === '/movies' && (
        <button className='movies__button-more' id='more-button' type='submit' onClick={handleButtonMore}>
          Ещё
        </button>
      )}
    </>
  );
}

export default MoviesCardList;
