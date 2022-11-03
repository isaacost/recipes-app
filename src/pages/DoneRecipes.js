import React, { useContext, useEffect } from 'react';
import FilterButtons from '../components/FilterButtons';
import Header from '../components/Header';
import SimpleCard from '../components/SimpleCard';
import { RecipesContext } from '../contexts/RecipesContext';

export default function DoneRecipes() {
  const { filterType, doneRecipes, setDoneRecipes } = useContext(RecipesContext);

  useEffect(() => {
    setDoneRecipes(JSON.parse(localStorage.getItem('doneRecipes')));
  }, [setDoneRecipes]);

  return (
    <div>
      <Header title="Done Recipes" />
      <FilterButtons />

      <div className="grid gap-4">
        { doneRecipes?.filter((recipe) => recipe.type.includes(filterType))
          .map((recipe, index) => (
            <SimpleCard key={ recipe.id } recipe={ recipe } index={ index } />
          ))}
      </div>
    </div>
  );
}
