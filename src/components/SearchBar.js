import React, { useContext } from 'react';
import MealContext from '../contexts/MealContext';

export default function SearchBar() {
  const {
    searchFor,
    setSearchFor,
    searchMeals,
    searchInput,
    setSearchInput,
  } = useContext(MealContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    searchMeals();
  };

  return (
    <form onSubmit={ handleSubmit }>
      <fieldset>
        <label htmlFor="search-input">
          <input
            data-testid="search-input"
            type="text"
            placeholder="Pesquise por receitas"
            value={ searchInput }
            onChange={ (event) => setSearchInput(event.target.value) }
          />
        </label>

        <label htmlFor="ingredients">
          <input
            type="radio"
            id="ingredients"
            name="searchFor"
            value={ searchFor }
            data-testid="ingredient-search-radio"
            onChange={ () => setSearchFor('ingredients') }
          />
          Ingrediente
        </label>

        <label htmlFor="name">
          <input
            type="radio"
            id="name"
            name="searchFor"
            value={ searchFor }
            data-testid="name-search-radio"
            onChange={ () => setSearchFor('name') }
          />
          Nome
        </label>

        <label htmlFor="firstLetter">
          <input
            type="radio"
            id="firstLetter"
            name="searchFor"
            value={ searchFor }
            data-testid="first-letter-search-radio"
            onChange={ () => setSearchFor('firstLetter') }
          />
          First letter
        </label>
      </fieldset>

      <button
        type="submit"
        data-testid="exec-search-btn"
      >
        Pesquisar
      </button>
    </form>
  );
}
