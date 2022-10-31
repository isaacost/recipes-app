import React from 'react';

function DoneRecipesCard() {
  return (
    <div>
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          value="all"
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          value="meal"
        >
          Meals
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          value="drink"
        >
          Drinks
        </button>
      </div>
      <p data-testid={ `${index}-horizontal-name` }>Name</p>
      <p data-testid={ `${index}-horizontal-top-text` }>Type</p>
      <p data-testid={ `${index}-horizontal-top-text` }>Nacionalidade - Categoria</p>
      <p data-testid={ `${index}-horizontal-done-date` }>Data em que foi feito</p>
      <p data-testid={ `${index}-horizontal-top-text` }>Alcoólico ou Não-alcoólico</p>
      <img
        src=""
        alt=""
        data-testid={ `${index}-horizontal-image` }
      />
      <img
        src=""
        alt=""
        data-testid={ `${index}-horizontal-share-btn` }
      />
      <p
        data-testid={ `${index}-${tagName}-horizontal-tag` }
      >
        Tag Name
      </p>
    </div>
  );
}

export default DoneRecipesCard;
