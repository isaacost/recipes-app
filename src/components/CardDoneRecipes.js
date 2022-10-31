// import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { shape, number } from 'prop-types';
import ShareButton from './ShareButton';

function CardDoneRecipes({ recipe, index }) {
  return (
    <div>
      <div>
        <Link to={ `/${recipe.type}s/${recipe.id}` }>

          <img
            src={ recipe.image }
            alt="Imagem da receita"
            data-testid={ `${index}-horizontal-image` }
            width="300px"
          />
          <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>

        </Link>
      </div>
      <p data-testid={ `${index}-horizontal-top-text` }>{recipe.type}</p>
      <p data-testid={ `${index}-horizontal-top-text` }>
        {`${recipe.nationality} - ${recipe.category}`}
      </p>
      <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
      <p data-testid={ `${index}-horizontal-top-text` }>{recipe.alcoholicOrNot}</p>

      <ShareButton index={ index } recipe={ recipe } />
      <p data-testid={ `${index}-${recipe.tags[0]}-horizontal-tag` }>
        {recipe.tags[0]}
      </p>
      <p data-testid={ `${index}-${recipe.tags[1]}-horizontal-tag` }>
        {recipe.tags[1]}
      </p>
    </div>
  );
}

CardDoneRecipes.propTypes = {
  recipe: shape({}).isRequired,
  index: number.isRequired,
};

export default CardDoneRecipes;
