import React, { useContext, useState } from 'react';
import Header from '../components/Header';
import CardDoneRecipes from '../components/CardDoneRecipes';
import { RecipesContext } from '../contexts/RecipesContext';

export default function DoneRecipes() {
  const { doneRecipes } = useContext(RecipesContext);
  const [filterType, setFilterType] = useState('');
  // useEffect(() => {
  //   JSON.parse(localStorage.getItem('doneRecipes'));
  // }, []);
  return (
    <div>
      <Header title="Done Recipes" />
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
      <div>
        { doneRecipes.filter((recipe) => recipe.type.includes(filterType))
          .map((recipe, index) => (
            <CardDoneRecipes key={ recipe.id } recipe={ recipe } index={ index } />
          ))}
      </div>
    </div>
  );
}
