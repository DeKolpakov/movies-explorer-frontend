import {BASE_URL} from './constants';

class ApiAuth {
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка запроса: ${res.status}`);
    }
  }

  register(name, email, password) {
    return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, email, password}),
    }).then(this._checkResponse);
  }

  authorize(email, password) {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password}),
    })
      .then(this._checkResponse)
      
  }

  checkToken() {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(this._checkResponse);
  }
}

const auth = new ApiAuth(BASE_URL);

export default auth;
