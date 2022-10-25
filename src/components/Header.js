import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { string } from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

export default function Header({ title }) {
  const [isShow, setIsShow] = useState(false);
  const history = useHistory();
  const { pathname } = history.location;
  return (
    <header>
      <Link to="/profile">
        <img src={ profileIcon } alt="profileIcon" data-testid="profile-top-btn" />
      </Link>
      {
        pathname !== '/profile'
        && pathname !== '/done-recipes'
        && pathname !== '/favorite-recipes'
        && (
          <div>
            <button
              type="button"
              onClick={ () => setIsShow(!isShow) }
            >
              <img src={ searchIcon } alt="searchIcon" data-testid="search-top-btn" />
            </button>
            { isShow && (
              <label htmlFor="search-input">
                <input
                  data-testid="search-input"
                  type="text"
                  placeholder="Pesquise por receitas"
                />
              </label>
            )}
          </div>
        )
      }
      <h1 data-testid="page-title">{ title }</h1>
      <div>
        <SearchBar />
      </div>
    </header>
  );
}

Header.propTypes = {
  title: string.isRequired,
};
