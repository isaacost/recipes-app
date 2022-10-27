import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { RecipesContext } from '../contexts/RecipesContext';
import { getRecipeDetails, getRecipes } from '../services/recipesAPI';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const MAX_CARD_LENGTH = 6;
const ONE_SEC = 1000;
const copy = require('clipboard-copy');

export default function RecipeDetails() {
  const { doneRecipes, inProgressRecipes } = useContext(RecipesContext);
  const history = useHistory();
  const [recipeDetails, setRecipeDetails] = useState({});
  const [recommendationsList, setRecommendationsList] = useState([]);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const { pathname } = history.location;
  const recipeId = pathname.split('/')[2];
  const recipeType = pathname.split('/')[1];

  const ingredientsList = Object
    .entries(recipeDetails)
    .filter((item) => item[0].includes('strIngredient') && item[1])
    .map((item) => item[1]);

  const measureList = Object
    .entries(recipeDetails)
    .filter((item) => item[0].includes('strMeasure') && item[1] !== ' ')
    .map((item) => item[1]);

  const youtubeLink = recipeDetails.strYoutube?.replace('watch?v=', 'embed/');

  const ingredientsListElement = (
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

  useEffect(() => {
    const fetch = async () => {
      const newRecipeDetails = await getRecipeDetails(recipeId, recipeType);
      setRecipeDetails(newRecipeDetails[0]);
    };

    fetch();
  }, [recipeId, recipeType]);

  useEffect(() => {
    const fetch = async () => {
      const newRecipeType = recipeType === 'meals' ? 'drinks' : 'meals';
      const newRecommendationsList = await getRecipes(newRecipeType);
      setRecommendationsList(newRecommendationsList);
    };
    fetch();
  }, [recipeType]);

  const handleShareButton = () => {
    copy(window.location.href);
    setIsLinkCopied(true);
    setTimeout(() => setIsLinkCopied(false), ONE_SEC);
  };

  return (
    <div>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ handleShareButton }
      >
        <img src={ shareIcon } alt="ícone de compartilhar" />
      </button>
      {isLinkCopied && <p>Link copied!</p>}

      <button type="button" data-testid="favorite-btn">
        <img src={ whiteHeartIcon } alt="ícone de favoritar branco" />
      </button>

      {recipeType === 'meals'
        ? (
          <div>
            <img
              src={ recipeDetails.strMealThumb }
              alt={ recipeDetails.strMeal }
              data-testid="recipe-photo"
            />

            <h2 data-testid="recipe-title">{recipeDetails.strMeal}</h2>
            <p data-testid="recipe-category">{recipeDetails.strCategory}</p>

            {ingredientsListElement}

            <p data-testid="instructions">{recipeDetails.strInstructions}</p>

            <iframe
              data-testid="video"
              title="YouTube video player"
              width="420"
              height="315"
              src={ youtubeLink }
            />

            <div style={ { overflowX: 'scroll', display: 'flex' } }>
              {recommendationsList
                .filter((card, index) => index < MAX_CARD_LENGTH && card)
                .map(({ idDrink, strDrinkThumb, strDrink }, index) => (
                  <div
                    key={ idDrink }
                    data-testid={ `${index}-recommendation-card` }
                    style={ { width: '51%' } }
                  >
                    <img
                      src={ strDrinkThumb }
                      alt={ strDrink }
                    />
                    <h3 data-testid={ `${index}-recommendation-title` }>
                      {strDrink}
                    </h3>
                  </div>
                ))}
            </div>
          </div>
        )
        : (
          <div>
            <img
              src={ recipeDetails.strDrinkThumb }
              alt={ recipeDetails.strDrink }
              data-testid="recipe-photo"
            />

            <h2 data-testid="recipe-title">{recipeDetails.strDrink}</h2>
            <p data-testid="recipe-category">{recipeDetails.strAlcoholic}</p>

            {ingredientsListElement}

            <p data-testid="instructions">{recipeDetails.strInstructions}</p>

            <div style={ { overflowX: 'scroll', display: 'flex' } }>
              {recommendationsList
                .filter((card, index) => index < MAX_CARD_LENGTH && card)
                .map(({ idMeal, strMealThumb, strMeal }, index) => (
                  <div
                    key={ idMeal }
                    data-testid={ `${index}-recommendation-card` }
                    style={ { width: '51%' } }
                  >
                    <img
                      src={ strMealThumb }
                      alt={ strMeal }
                    />
                    <h3 data-testid={ `${index}-recommendation-title` }>
                      {strMeal}
                    </h3>
                  </div>
                ))}
            </div>
          </div>
        )}

      {doneRecipes.every((recipe) => recipe.id !== recipeId) && (
        <button
          type="button"
          data-testid="start-recipe-btn"
          style={ { bottom: '0px', position: 'fixed' } }
          onClick={ () => history.push(`/${recipeType}/${recipeId}/in-progress`) }
        >
          {Object.keys(inProgressRecipes[recipeType])
            .every((id) => id !== recipeId)
            ? 'Start Recipe'
            : 'Continue Recipe'}
        </button>
      )}

    </div>
  );
}
