import {BASE_URL} from './constants';

class MainApi {
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  //___USER_________________________________________________________________________________

  getUserInfo() {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(this._checkResponse);
  }

  editUserInfo(data) {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      }),
    }).then(this._checkResponse);
  }

  //___MOVIES____________________________________________________________________________________

  saveMovie(movie) {
    return fetch(`${BASE_URL}/movies`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `https://api.nomoreparties.co${movie.image.url}`,
        trailerLink: movie.trailerLink,
        thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      }),
    }).then(this._checkResponse);
  }

  getMovies() {
    return fetch(`${BASE_URL}/movies`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(this._checkResponse);
  }

  delMovie(movieId) {
    return fetch(`${BASE_URL}/movies/${movieId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(this._checkResponse);
  }
}

const mainApi = new MainApi(BASE_URL);

export default mainApi;
