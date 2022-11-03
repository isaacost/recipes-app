import React, { useContext } from 'react';
import { RecipesContext } from '../contexts/RecipesContext';
import allIcon from '../images/all-icon.png';
import drinksIcon from '../images/drinks-icon.png';
import foodsIcon from '../images/foods-icon.png';

export default function FilterButtons() {
  const { setFilterType } = useContext(RecipesContext);
  const textStyles = 'text-purple-800 font-bold';
  return (
    <div className="flex justify-center gap-4 my-4">
      <button
        type="button"
        data-testid="filter-by-all-btn"
        value="All"
        onClick={ () => setFilterType('') }
      >
        <img src={ allIcon } alt="" />
        <p className={ textStyles }>All</p>
      </button>

      <button
        type="button"
        data-testid="filter-by-meal-btn"
        value="Meals"
        onClick={ () => setFilterType('meal') }
      >
        <img src={ foodsIcon } alt="" />
        <p className={ textStyles }>Meals</p>
      </button>

      <button
        type="button"
        data-testid="filter-by-drink-btn"
        value="Drink"
        onClick={ () => setFilterType('drink') }
      >
        <img src={ drinksIcon } alt="" />
        <p className={ textStyles }>Drinks</p>
      </button>
    </div>
  );
}
