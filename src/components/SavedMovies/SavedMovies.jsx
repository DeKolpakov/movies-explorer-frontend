import React, {useContext, useState, useEffect} from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';

import mainApi from '../../utils/MainApi';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';

function SavedMovies({isLoggedIn}) {
  const currentUser = useContext(CurrentUserContext);

  const [savedCards, setSavedCards] = useState([]);
  const [displayedCards, setDisplayedCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [checkboxState, setCheckboxState] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setNotFound(false);
        setError(false);
        setIsLoading(true);
        const res = await mainApi.getMovies();
        const myMovies = res.filter((c) => c.owner === currentUser._id);
        if (myMovies.length === 0) {
          setNotFound(true);
        } else {
          setSavedCards(myMovies);
          setDisplayedCards(savedCards);
          setNotFound(false);
        }
      } catch (e) {
        console.error(e);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [currentUser]);

  useEffect(() => {
    setDisplayedCards(savedCards);
  }, [savedCards]);

  useEffect(() => {
    resetFilteredCards();
  }, [checkboxState]);

  const handleChangeCheckbox = () => {
    setCheckboxState((current) => !current);
  };

  const filterMovies = (searchWord, data) => {
    if (checkboxState) {
      return data.filter(
        ({nameRU, duration}) => nameRU.toLowerCase().includes(searchWord.toLowerCase()) && duration < 30
      );
    } else {
      return data.filter(({nameRU}) => nameRU.toLowerCase().includes(searchWord.toLowerCase()));
    }
  };

  function resetFilteredCards() {
    const filteredRes = filterMovies(searchQuery, savedCards);
    if (filteredRes.length === 0) {
      setDisplayedCards(filteredRes);
      setNotFound(true);
    } else {
      setNotFound(false);
      setDisplayedCards(filteredRes);
    }
  }

  const handleSearch = () => {
    const filteredRes = filterMovies(searchQuery, savedCards);
    if (filteredRes.length === 0) {
      setDisplayedCards(filteredRes);
      setNotFound(true);
    } else {
      setNotFound(false);
      setDisplayedCards(filteredRes);
    }
  };

  function onCardDelete(id) {
    mainApi
      .delMovie(id)
      .then(() => {
        const displaedMoviesList = displayedCards.filter((item) => item._id !== id);
        if (displaedMoviesList.length === 0) {
          setNotFound(true);
        } else {
          setNotFound(false);
          setDisplayedCards(displaedMoviesList);
        }
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
    /* try {
      await mainApi.delMovie(id);
      const res = await mainApi.getMovies();
      if (res.length === 0) {
        setSavedCards(res);
        setNotFound(true);
      } else {
        setNotFound(false)
        setSavedCards(res);
        setDisplayedCards(savedCards);
      }
    } catch (e) {
      console.error(e);
    } */
  }

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <SearchForm
        query={searchQuery}
        setQuery={setSearchQuery}
        handleSearch={handleSearch}
        handleChange={handleChangeCheckbox}
        checkboxState={checkboxState}
      />

      <section className='movies'>
        {isLoading ? (
          <Preloader />
        ) : (
          <MoviesCardList
            cards={displayedCards}
            savedCards={savedCards}
            isLoading={isLoading}
            onCardDelete={onCardDelete}
          />
        )}
        {notFound && <p className='movies__card-message'>У вас пока нет сохраненных фильмов</p>}
        {error && <p className='movies__card-message'>Во время запроса произошла ошибка.</p>}
      </section>

      <Footer />
    </>
  );
}

export default SavedMovies;
