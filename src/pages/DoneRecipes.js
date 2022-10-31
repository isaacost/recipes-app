import React, { useContext } from 'react';
import Header from '../components/Header';
import CardDoneRecipes from '../components/CardDoneRecipes';
import { RecipesContext } from '../contexts/RecipesContext';

export default function DoneRecipes() {
  const { doneRecipes } = useContext(RecipesContext);
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
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          value="Meals"
        >
          Meals
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          value="Drink"
        >
          Drinks
        </button>
      </div>
      <div>
        { doneRecipes.map((recipe, index) => (
          <CardDoneRecipes key={ recipe.id } recipe={ recipe } index={ index } />
        ))}
      </div>
    </div>
  );
}
