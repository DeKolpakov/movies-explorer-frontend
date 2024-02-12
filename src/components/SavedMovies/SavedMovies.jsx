import React from 'react';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import BurgerMenu from '../BurgerMenu/BurgerMenu'

function SavedMovies() {
  return (
    <>
      <Header />
      <SearchForm />
      <section className='movies'>
        <MoviesCardList />
      </section>
      <BurgerMenu/>
      <Footer />
    </>
  );
}

export default SavedMovies;
