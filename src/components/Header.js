import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { string } from 'prop-types';
import profileIcon from '../images/profile-icon.png';
import searchIcon from '../images/search-icon.png';
import SearchBar from './SearchBar';
import logoHeader from '../images/logo-header.png';

export default function Header({ title }) {
  const [isShow, setIsShow] = useState(false);
  const history = useHistory();
  const { pathname } = history.location;

  return (
    <header className="bg-amber-400  px-6 py-4">
      <div className="flex justify-between ">
        <Link to="meals" className="flex items-center gap-4">
          <img src={ logoHeader } alt="logo recipes app" />
          <p className="text-purple-800 text-lg">
            <span className="italic">RECIPES</span>
            <span className="ml-2 font-bold">app</span>
          </p>
        </Link>

        <div className="flex gap-4 items-center">
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
          </div>
        )
          }

          <Link to="/profile">
            <img src={ profileIcon } alt="profileIcon" data-testid="profile-top-btn" />
          </Link>
        </div>
      </div>

      <div>
        <h1
          className={ `text-xl uppercase font-bold text-purple-800 
        text-center mt-6 tracking-widest` }
          data-testid="page-title"
        >
          { title }
        </h1>
        { isShow && <SearchBar /> }
      </div>
    </header>
  );
}

Header.propTypes = {
  title: string.isRequired,
};
