import React, { useContext } from 'react';
import { RecipesContext } from '../contexts/RecipesContext';

export default function SearchBar() {
  const {
    searchFor,
    setSearchFor,
    searchMeals,
    searchInput,
    setSearchInput,
  } = useContext(RecipesContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    searchMeals();
  };

  return (
    <form
      onSubmit={ handleSubmit }
      className="bg-purple-800 text-white text-center p-4 rounded mt-4"
    >
      <fieldset>
        <label htmlFor="search-input" className="w-full">
          <input
            data-testid="search-input"
            type="text"
            placeholder="Pesquise por receitas"
            value={ searchInput }
            onChange={ (event) => setSearchInput(event.target.value) }
            className="w-full rounded p-2 mb-4 text-purple-800"
          />
        </label>

        <div className="flex gap-4 justify-center">
          <label htmlFor="ingredients">
            <input
              type="radio"
              id="ingredients"
              name="searchFor"
              value={ searchFor }
              data-testid="ingredient-search-radio"
              onChange={ () => setSearchFor('ingredients') }
              className="mr-2 checked:bg-amber-400"
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
              className="mr-2"
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
              className="mr-2"
            />
            First letter
          </label>
        </div>
      </fieldset>

      <button
        type="submit"
        data-testid="exec-search-btn"
        className="bg-amber-400 w-[80%] rounded p-2 font-bold uppercase mt-4"
      >
        Pesquisar
      </button>
    </form>
  );
}
