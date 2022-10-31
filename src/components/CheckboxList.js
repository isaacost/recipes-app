/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { RecipesContext } from '../contexts/RecipesContext';

export default function CheckboxList() {
  const {
    ingredientsList,
    measureList,
    recipeType,
    recipeId,
    inProgressRecipes,
    usedIngredients,
    setUsedIngredients,
  } = useContext(RecipesContext);

  const lineStyles = 'line-through solid rgb(0, 0, 0)';

  useEffect(() => {
    const newInProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (newInProgressRecipes && newInProgressRecipes[recipeType][recipeId]) {
      setUsedIngredients(newInProgressRecipes[recipeType][recipeId]);
    }
  }, [inProgressRecipes, recipeId, recipeType]);

  const handleChange = ({ target }, selectedIngredient) => {
    if (target.checked) {
      target.parentNode.style.textDecoration = lineStyles;
    } else {
      target.parentNode.style.textDecoration = '';
    }

    let newUsedIngredients = usedIngredients
      ?.filter((ingredient) => ingredient !== selectedIngredient);

    if (newUsedIngredients?.length === usedIngredients?.length) {
      newUsedIngredients = [...usedIngredients, selectedIngredient];
    }

    setUsedIngredients([...newUsedIngredients]);

    let localInProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    localInProgressRecipes = {
      ...localInProgressRecipes,
      [recipeType]: {
        [recipeId]: [...newUsedIngredients],
      },
    };

    localStorage.setItem('inProgressRecipes', JSON.stringify(localInProgressRecipes));

    // localStorage.setItem('inProgressRecipes', JSON.stringify(
    //   {
    //     [recipeType]: {
    //       [recipeId]: [...newUsedIngredients],
    //     },
    //   },
    // ));
  };

  return (
    <ul>
      {ingredientsList.map((ingredient, index) => (
        <li key={ index }>
          <label
            htmlFor={ ingredient }
            data-testid={ `${index}-ingredient-step` }
            style={ { textDecoration: usedIngredients
              ?.includes(ingredient) && lineStyles } }
          >
            <input
              type="checkbox"
              id={ ingredient }
              value={ ingredient }
              checked={ usedIngredients?.includes(ingredient) }
              onChange={ (event) => handleChange(event, ingredient) }
            />
            {`${measureList[index]} ${ingredient}`}
          </label>
        </li>
      ))}
    </ul>
  );
}
