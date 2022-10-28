import React, { useContext } from 'react';
import { RecipesContext } from '../contexts/RecipesContext';

export default function CheckboxList() {
  const { ingredientsList, measureList } = useContext(RecipesContext);

  return (
    <ul>
      {ingredientsList.map((ingredient, index) => (
        <li key={ index }>
          <label
            htmlFor={ ingredient }
            data-testid={ `${index}-ingredient-step` }
          >
            <input
              type="checkbox"
              id={ ingredient }
              value={ ingredient }
            />
            {`${measureList[index]} ${ingredient}`}
          </label>
        </li>
      ))}
    </ul>
  );
}
