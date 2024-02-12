import React from 'react';
import CheckBox from '../CheckBox/CheckBox';

function SearchForm() {
  return (
    <section className='search'>
      <form className='search-form'>
        <input className='search-form__input' id='search' name='search' type='text' placeholder='Фильм' required />
        <button className='search-form__button' id='search-button' type='submit' disabled></button>
      </form>
      <CheckBox />
    </section>
  );
}

export default SearchForm;
