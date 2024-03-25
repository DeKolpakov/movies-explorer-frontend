import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import useResize from 'use-resize';

import {
  START_QUANTITI_MOVIES_L,
  START_QUANTITI_MOVIES_M,
  START_QUANTITI_MOVIES_S,
  WIDTH_SIZE_L,
  WIDTH_SIZE_M,
} from '../../utils/constants';

function PreloaderCards() {
  const {pathname} = useLocation();
  const size = useResize();

  const [items, setItems] = useState([]);

  const [startItem, setStartItem] = useState(START_QUANTITI_MOVIES_L);

  useEffect(() => {
    if (pathname === '/movies') {
      if (size.width > WIDTH_SIZE_L) {
        setStartItem(START_QUANTITI_MOVIES_L);
      } else if (size.width > WIDTH_SIZE_M) {
        setStartItem(START_QUANTITI_MOVIES_M);
      } else {
        setStartItem(START_QUANTITI_MOVIES_S);
      }
    } else {
      setStartItem(12);
    }
  }, [size, pathname]);

  useEffect(() => {
    const resetCards = () => {
      const newItems = Array.from({length: startItem}, (_, index) => index);
      setItems(newItems);
    };
    resetCards();
  }, [size, startItem]);

  return (
    <>
      <div className='movies__card-list'>
        {items.map((item) => (
          <div key={item} className='movies__item'>
            <div className={pathname === '/movies' ? 'preloader__button-save' : 'preloader__button-delete'}></div>
            <div className='preloader__img'>
              <span className='flare'></span>
            </div>
            <div className='movies__info'>
              <div className='preloader__title'></div>
              <div className='preloader__time'></div>
            </div>
          </div>
        ))}
      </div>
      {pathname === '/movies' && (
        <button className='movies__button-more' id='more-button'>
          Ещё
        </button>
      )}
    </>
  );
}

export default PreloaderCards;
