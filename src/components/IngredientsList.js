import React, { useContext } from 'react';
import { RecipesContext } from '../contexts/RecipesContext';

export default function IngredientsList() {
  const { recipeDetails } = useContext(RecipesContext);

  const ingredientsList = Object
    .entries(recipeDetails)
    .filter((item) => item[0].includes('strIngredient') && item[1])
    .map((item) => item[1]);

  const measureList = Object
    .entries(recipeDetails)
    .filter((item) => item[0].includes('strMeasure') && item[1] !== ' ')
    .map((item) => item[1]);

  return (
    <ul>
      {ingredientsList.map((ingredient, index) => (
        <li
          key={ index }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {`${measureList[index]} ${ingredient}`}
        </li>
      ))}
    </ul>
  );
}
