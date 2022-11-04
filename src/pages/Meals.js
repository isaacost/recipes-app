import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { RecipesContext } from '../contexts/RecipesContext';

const MAX_RECIPES_LENGTH = 12;

export default function Meals() {
  const { filteredRecipesList } = useContext(RecipesContext);

  return (
    <div className="grid grid-cols-2 gap-2 px-2">
      {filteredRecipesList?.reduce((acc, recipe, index) => {
        if (index < MAX_RECIPES_LENGTH) acc.push(recipe);
        return acc;
      }, []).map((recipe, index) => (
        <Link
          to={ `/meals/${recipe.idMeal}` }
          key={ recipe.idMeal }
        >
          <div
            data-testid={ `${index}-recipe-card` }
            className="max-w-xs min-h-48 border border-purple-300 rounded opacity-90
            hover:opacity-100 transition-all hover:shadow-md"
          >
            <img
              src={ recipe.strMealThumb }
              alt={ recipe.strMeal }
              data-testid={ `${index}-card-img` }
              className="w-full"
            />

            <h2 className="p-2" data-testid={ `${index}-card-name` }>{recipe.strMeal}</h2>
          </div>
        </Link>
      ))}
    </div>
  );
}
