import React from 'react';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

function Movies() {
  return (
    <>
      <Header />
      <SearchForm />
      <section className='movies'>
        <MoviesCardList />
        <button className='movies__button-more' id='more-button' type='submit' disabled>
          Ещё
        </button>
      </section>
      <BurgerMenu />
      <Footer />
    </>
  );
}

export default Movies;
