import React, {useContext, useState, useEffect} from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import PreloaderCards from '../Preloader/PreloaderCards';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Message from '../Message/Message';

import mainApi from '../../utils/MainApi';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';

import dontFind from '../../images/dontFind.png';
import dontSave from '../../images/dontSave.png';
import requestError from '../../images/requestError.png';

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
        /*  setTimeout(() => {
          setIsLoading(false);
        }, 100000); */
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
        const displaedMoviesList = savedCards.filter((item) => item._id !== id);
        if (displaedMoviesList.length === 0) {
          setNotFound(true);
          setSavedCards(displaedMoviesList);
        } else {
          setNotFound(false);
          setSavedCards(displaedMoviesList);
        }
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
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
          <PreloaderCards />
        ) : (
          <>
            <MoviesCardList
              cards={displayedCards}
              savedCards={savedCards}
              isLoading={isLoading}
              onCardDelete={onCardDelete}
            />
            {notFound && <Message img={dontSave} />}
            {error && <Message img={requestError} />}
          </>
        )}
      </section>

      <Footer />
    </>
  );
}

export default SavedMovies;
