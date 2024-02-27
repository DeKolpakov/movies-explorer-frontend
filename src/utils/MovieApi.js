import {MOVIE_URL} from './constants';

class MovieApi {
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  getMovies() {
    return fetch(`${MOVIE_URL}/beatfilm-movies`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(this._checkResponse);
  }
}

const movieApi = new MovieApi(MOVIE_URL);

export default movieApi;
