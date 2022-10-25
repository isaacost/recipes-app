import React from 'react';

export default function SearchBar() {
  return (
    <form>
      <label htmlFor="search-input">
        <input
          id="search-input"
          name="search-input"
          data-testid="search-input"
          type="text"
          placeholder="Pesquise por receitas"
        />
      </label>
      <fieldset>
        <label htmlFor="ingredients">
          <input
            type="radio"
            id="ingredients"
            name="searchFor"
            value="byIngredients"
            data-testid="ingredient-search-radio"
          />
          Ingrediente
        </label>
        <label htmlFor="name">
          <input
            type="radio"
            id="name"
            name="searchFor"
            value="byName"
            data-testid="name-search-radio"
          />
          Nome
        </label>
        <label htmlFor="firstletter">
          <input
            type="radio"
            id="firstletter"
            name="searchFor"
            value="byFirstLetter"
            data-testid="first-letter-search-radio"
          />
          First letter
        </label>
      </fieldset>
      <button
        type="button"
        data-testid="exec-search-btn"
      >
        Pesquisar
      </button>
    </form>
  );
}
