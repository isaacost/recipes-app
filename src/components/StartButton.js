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

  console.log(inProgressRecipes);

  return (
    <div>
      {doneRecipes.every((recipe) => recipe.id !== recipeId) && (
        <button
          type="button"
          data-testid="start-recipe-btn"
          style={ { bottom: '0px', position: 'fixed' } }
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
