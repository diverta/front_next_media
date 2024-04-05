'use client';
import { useState } from 'react';

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    window.location.href = `/article?search=${searchTerm}`;
  };
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };
  return (
    <div className='l-header__nav__search'>
      <form onSubmit={handleSubmit}>
        <button
          type='submit'
          aria-label='検索'
          className='l-header__nav__searchButton'
        ></button>
        <label>
          <input
            type='text'
            placeholder='キーワードを入力'
            className='l-header__nav__searchText'
            value={searchTerm}
            onChange={handleInputChange}
          />
        </label>
      </form>
    </div>
  );
}
