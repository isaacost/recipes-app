import React, { useContext } from 'react';
import { RecipesContext } from '../contexts/RecipesContext';

export default function FilterButtons() {
  const { setFilterType } = useContext(RecipesContext);

  return (
    <div>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        value="All"
        onClick={ () => setFilterType('') }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        value="Meals"
        onClick={ () => setFilterType('meal') }
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        value="Drink"
        onClick={ () => setFilterType('drink') }
      >
        Drinks
      </button>
    </div>
  );
}
