import React, { useContext } from 'react';
import { RecipesContext } from '../contexts/RecipesContext';

export default function IngredientsList() {
  const {
    ingredientsList,
    measureList,
  } = useContext(RecipesContext);

  return (
    <ul>
      {ingredientsList.map((ingredient, index) => (
        <li
          key={ index }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {`${measureList[index] !== undefined ? measureList[index] : ''} ${ingredient}`}
        </li>
      ))}
    </ul>
  );
}
