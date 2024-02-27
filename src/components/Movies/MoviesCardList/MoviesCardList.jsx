import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import useResize from 'use-resize';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({cards, savedCards, onCardSave, onCardDelete}) {
  
  const {pathname} = useLocation();
  const size = useResize();

  const [items, setItems] = useState([]);
  const [addMore, setAddMore] = useState(3);
  const [startItem, setStartItem] = useState(12);

  useEffect(() => {
    if (size.width > 1200) {
      setStartItem(12);
      setAddMore(3);
    } else if (size.width > 600) {
      setStartItem(8);
      setAddMore(2);
    } else {
      setStartItem(5);
      setAddMore(2);
    }
  }, [size]);

  useEffect(() => {
    resetCards();
  }, [cards, size]);

  function resetCards() {
    setItems(cards.slice(0, startItem));
  }

  const handleButtonMore = () => {
    setItems([...items, ...cards.slice(items.length, items.length + addMore)]);
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
