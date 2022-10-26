import React, { useContext } from 'react';
import { RecipesContext } from '../contexts/RecipesContext';

const MAX_RECIPES_LENGTH = 12;

export default function Drinks() {
  const { filteredRecipesList } = useContext(RecipesContext);

  return (
    <div>
      {filteredRecipesList?.reduce((acc, recipe, index) => {
        if (index < MAX_RECIPES_LENGTH) acc.push(recipe);
        return acc;
      }, []).map((recipe, index) => (
        <div key={ recipe.idDrink } data-testid={ `${index}-recipe-card` }>
          <img
            src={ recipe.strDrinkThumb }
            alt={ recipe.strDrink }
            data-testid={ `${index}-card-img` }
          />
          <h2 data-testid={ `${index}-card-name` }>{recipe.strDrink}</h2>
        </div>
      ))}
    </div>
  );
}
