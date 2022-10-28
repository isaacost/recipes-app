import React, { useContext } from 'react';
import { RecipesContext } from '../contexts/RecipesContext';

export default function CheckboxList() {
  const { ingredientsList, measureList } = useContext(RecipesContext);

  const handleChange = ({ target }) => {
    if (target.checked) {
      target.parentNode.style.textDecoration = 'line-through solid rgb(0, 0, 0)';
    } else {
      target.parentNode.style.textDecoration = '';
    }
  };

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
              onChange={ handleChange }
            />
            {`${measureList[index]} ${ingredient}`}
          </label>
        </li>
      ))}
    </ul>
  );
}
