import React, {useState, useEffect} from 'react';
import CheckBox from '../CheckBox/CheckBox';

function SearchForm({query, setQuery, handleSearch, handleChange, checkboxState, isLoading}) {
  const [searchError, setSearchError] = useState('');

  useEffect(() => {
    setSearchError('');
  }, [query]);

  function handleSubmitSearch(e) {
    e.preventDefault();
    if (!query || query.length === 0) {
      setSearchError('Введите текст для поиска');
    } else {
      handleSearch();
    }
  }

  return (
    <section className='search'>
      <form className='search-form' onSubmit={handleSubmitSearch} noValidate>
        <input
          className='search-form__input'
          type='text'
          id='search'
          name='search'
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          placeholder='Фильм'
          disabled={isLoading}
          required
        />
        <button className='search-form__button' id='search-button' type='submit' disabled={isLoading} />
      </form>
      <span className='search-form__span'>{searchError}</span>
      <CheckBox handleChange={handleChange} checkboxState={checkboxState} />
    </section>
  );
}

export default SearchForm;
