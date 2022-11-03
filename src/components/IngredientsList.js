import React, { useContext } from 'react';
import { RecipesContext } from '../contexts/RecipesContext';

export default function IngredientsList() {
  const {
    ingredientsList,
    measureList,
  } = useContext(RecipesContext);

  return (
    <div>
      <h3 className="font-bold text-xl mb-2">Ingredients: </h3>
      <ul className="border p-4">
        {ingredientsList.map((ingredient, index) => (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            <span>- </span>
            {`${measureList[index] !== undefined
              ? measureList[index]
              : ''} ${ingredient}`}
          </li>
        ))}
      </ul>
    </div>
  );
}
