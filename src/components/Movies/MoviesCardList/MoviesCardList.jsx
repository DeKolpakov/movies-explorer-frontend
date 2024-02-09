import React, {useState, useEffect} from 'react';

import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../../Preloader/Preloader';

import movies from '../../../utils/movies';

function MoviesCardList() {
  const [loading, setLoading] = useState(true);
  const [moviesData, setMoviesData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      setTimeout(() => {
        setMoviesData(movies);
        setLoading(false);
      }, 1000);
    };

    fetchData();
  }, []);

  return (
    <div className='movies__card-list'>
      {loading ? <Preloader /> : moviesData.map((movie) => <MoviesCard key={movie.movieId} movie={movie} />)}
    </div>
  );
}

export default MoviesCardList;
