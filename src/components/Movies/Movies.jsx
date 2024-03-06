import React, {useContext, useState, useEffect} from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';

import mainApi from '../../utils/MainApi';
import movieApi from '../../utils/MovieApi';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import {TIME_MOVIE_SHORT} from '../../utils/constants';

function Movies({isLoggedIn}) {
  const currentUser = useContext(CurrentUserContext);

  const [isLoading, setIsLoading] = useState(false);
  const [firstSearch, setFirstSearch] = useState(false);
  const [error, setError] = useState(false);
  const [savedCards, setSavedCards] = useState([]);

  const getLocalStorageData = (key) => {
    let data = null;
    try {
      data = localStorage.getItem(key);
    } catch (err) {
      console.error(err);
    }
    return data;
  };

  const getQueryFromLocalStorage = () => {
    const data = getLocalStorageData('searchQuery');
    return typeof data === 'string' ? data : '';
  };

  const getFoundCardsFromLocalStorage = () => {
    const data = getLocalStorageData('foundCards');
    return Array.isArray(data) ? data : [];
  };

  const getCheckboxStateFromLocalStorage = () => {
    const data = getLocalStorageData('checkboxState');
    return typeof JSON.parse(data) === 'boolean' ? JSON.parse(data) : false;
  };

  const getNotFoundFromLocalStorage = () => {
    const data = getLocalStorageData('notFound');
    return typeof JSON.parse(data) === 'boolean' ? JSON.parse(data) : false;
  };

  const [searchQuery, setSearchQuery] = useState(getQueryFromLocalStorage);
  const [foundCards, setFoundCards] = useState(getFoundCardsFromLocalStorage);
  const [checkboxState, setCheckboxState] = useState(getCheckboxStateFromLocalStorage);
  const [notFound, setNotFound] = useState(getNotFoundFromLocalStorage);

  useEffect(() => {
    localStorage.setItem('notFound', notFound);
  }, [notFound]);

  useEffect(() => {
    localStorage.setItem('checkboxState', checkboxState);
    resetFilteredCards();
  }, [checkboxState]);

  useEffect(() => {
    checkSavedCards();
  }, [currentUser]);

  useEffect(() => {
    checkFirstSearch();
  }, [currentUser, isLoading]);

  const handleChange = () => {
    setCheckboxState((current) => !current);
  };

  const filterMovies = (text, data) => {
    if (checkboxState) {
      return data.filter(
        ({nameRU, duration}) => nameRU.toLowerCase().includes(text.toLowerCase()) && duration < TIME_MOVIE_SHORT
      );
    } else {
      return data.filter(({nameRU}) => nameRU.toLowerCase().includes(text.toLowerCase()));
    }
  };

  async function resetFilteredCards() {
    try {
      const movies = JSON.parse(localStorage.getItem('movies'));
      if (!Array.isArray(movies)) {
        setFirstSearch(true);
      } else {
        const filteredRes = filterMovies(searchQuery, movies);
        setFoundCards(filteredRes);
        setFirstSearch(false);
        if (filteredRes.length === 0) {
          setNotFound(true);
        } else {
          setNotFound(false);
        }
      }
    } catch (err) {
      setError(true);
      console.error(err);
    }
  }

  function setFilteredMovies(movies) {
    const filteredMovies = filterMovies(searchQuery, movies);
    setFoundCards(filteredMovies);
    setNotFound(filteredMovies.length === 0);
    localStorage.setItem('foundCards', JSON.stringify(filteredMovies));
    localStorage.setItem('searchQuery', searchQuery);
    localStorage.setItem('checkboxState', checkboxState);
  }

  function checkMovies() {
    const movies = localStorage.getItem('movies');
    return movies ? true : false;
  }

  function checkFirstSearch() {
    const movies = localStorage.getItem('movies');
    if (movies) {
      setFirstSearch(false);
    } else {
      setFirstSearch(true);
    }
  }

  const handleSearch = async () => {
    try {
      setFoundCards([]);
      setNotFound(false);
      setError(false);
      setIsLoading(true);
      if (checkMovies()) {
        const movies = JSON.parse(localStorage.getItem('movies'));
        setFilteredMovies(movies);
      } else {
        const movies = await movieApi.getMovies();
        localStorage.setItem('movies', JSON.stringify(movies));
        setFilteredMovies(movies);
      }
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setFirstSearch(false);
      setIsLoading(false);
    }
  };

  async function checkSavedCards() {
    try {
      const res = await mainApi.getMovies();
      const myMovies = res.filter((movie) => movie.owner === currentUser._id);
      setSavedCards(myMovies);
    } catch (err) {
      console.error(err);
      setFoundCards([]);
      setError(true);
    }
  }

  const onCardSave = async (movie) => {
    try {
      const movieToSaved = savedCards.some((savedMovie) => savedMovie.movieId === movie.id);
      const movieToDelete = savedCards.find((savedMovie) => savedMovie.movieId === movie.id);
      if (!movieToSaved) {
        await mainApi.saveMovie(movie);
        checkSavedCards();
        console.log('Карточка успешно сохранена');
      } else {
        await mainApi.delMovie(movieToDelete._id);
        checkSavedCards();
        console.log('Карточка успешно удалена');
      }
    } catch (err) {
      console.error('Ошибка сохранения карточки:', err);
      setFoundCards([]);
      setError(true);
    }
  };

  const onCardDelete = async (id) => {
    try {
      await mainApi.delMovie(id);
      checkSavedCards();
      console.log('Карточка успешно удалена');
    } catch (err) {
      console.error('Ошибка удаления карточки:', err);
      setFoundCards([]);
      setError(true);
    }
  };

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <SearchForm
        query={searchQuery}
        setQuery={setSearchQuery}
        handleSearch={handleSearch}
        handleChange={handleChange}
        checkboxState={checkboxState}
        isLoading={isLoading}
      />

      <section className='movies'>
        {isLoading ? (
          <Preloader />
        ) : (
          <MoviesCardList
            cards={foundCards}
            savedCards={savedCards}
            onCardSave={onCardSave}
            onCardDelete={onCardDelete}
            foundCards={foundCards}
          />
        )}
        {!isLoading && firstSearch && <p className='movies__card-message'>Для начала введите поисковой запрос</p>}
        {notFound && <p className='movies__card-message'>Ничего не найдено</p>}
        {error && <p className='movies__card-message'>Во время запроса произошла ошибка</p>}
      </section>
      <Footer />
    </>
  );
}

export default Movies;
