import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { RecipesContext } from '../contexts/RecipesContext';

export default function StartButton() {
  const {
    doneRecipes,
    recipeId,
    recipeType,
    inProgressRecipes,
  } = useContext(RecipesContext);
  const history = useHistory();

  return (
    <div className="mx-auto w-[80%]">
      {doneRecipes.every((recipe) => recipe.id !== recipeId) && (
        <button
          type="button"
          data-testid="start-recipe-btn"
          className={ `my-10 bg-amber-400 text-purple-800 font-bold p-2 
          rounded w-full hover:bg-amber-300` }
          onClick={ () => history.push(`/${recipeType}/${recipeId}/in-progress`) }
        >
          {Object.keys(inProgressRecipes[recipeType])
            .every((id) => id !== recipeId)
            ? 'Start Recipe'
            : 'Continue Recipe'}
        </button>
      )}
    </div>
  );
}
