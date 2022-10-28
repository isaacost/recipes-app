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
  const {
    doneRecipes,
    inProgressRecipes,
    favoriteRecipes,
    setFavoriteRecipes,
  } = useContext(RecipesContext);

  const history = useHistory();
  const [recipeDetails, setRecipeDetails] = useState({});
  const [recommendationsList, setRecommendationsList] = useState([]);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const { pathname } = history.location;
  const recipeId = pathname.split('/')[2];
  const recipeType = pathname.split('/')[1];
  const type = recipeType === 'meals' ? 'Meal' : 'Drink';

  const ingredientsList = Object
    .entries(recipeDetails)
    .filter((item) => item[0].includes('strIngredient') && item[1])
    .map((item) => item[1]);

  const measureList = Object
    .entries(recipeDetails)
    .filter((item) => item[0].includes('strMeasure') && item[1] !== ' ')
    .map((item) => item[1]);

  const youtubeLink = recipeDetails.strYoutube?.replace('watch?v=', 'embed/');

  useEffect(() => {
    const fetch = async () => {
      const newRecipeDetails = await getRecipeDetails(recipeId, recipeType);
      setRecipeDetails(newRecipeDetails[[recipeType]][0]);
    };

    fetch();
  }, [recipeId, recipeType]);

  useEffect(() => {
    const fetch = async () => {
      const recommendationType = recipeType === 'meals' ? 'drinks' : 'meals';
      const newRecommendationsList = await getRecipes(recommendationType);
      setRecommendationsList(newRecommendationsList[recommendationType]);
    };
    fetch();
  }, [recipeType]);

  const handleShareButton = () => {
    copy(window.location.href);
    setIsLinkCopied(true);
    setTimeout(() => setIsLinkCopied(false), ONE_SEC);
  };

  const handleFavoriteButton = () => {
    const localFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    const newFavoriteRecipe = {
      id: recipeDetails[`id${type}`],
      type: recipeType.replace('s', ''),
      nationality: recipeDetails.strArea || '',
      category: recipeDetails.strCategory || '',
      alcoholicOrNot: recipeDetails.strAlcoholic || '',
      name: recipeDetails[`str${type}`],
      image: recipeDetails[`str${type}Thumb`],
    };

    if (!localFavoriteRecipes) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([newFavoriteRecipe]));
      return setFavoriteRecipes([newFavoriteRecipe]);
    }

    let newLocalFavoriteRecipes = localFavoriteRecipes
      .filter((recipe) => recipe.id !== recipeDetails[`id${type}`]);

    if (newLocalFavoriteRecipes.length === localFavoriteRecipes.length) {
      newLocalFavoriteRecipes = [...newLocalFavoriteRecipes, newFavoriteRecipe];
    } else {
      newLocalFavoriteRecipes = [...newLocalFavoriteRecipes];
    }

    localStorage.setItem('favoriteRecipes', JSON.stringify(newLocalFavoriteRecipes));
    setFavoriteRecipes(newLocalFavoriteRecipes);
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

      <button
        type="button"
        onClick={ handleFavoriteButton }
      >
        <img
          data-testid="favorite-btn"
          src={ favoriteRecipes
            .some((recipe) => recipe.id === recipeDetails[`id${type}`])
            ? blackHeartIcon
            : whiteHeartIcon }
          alt="ícone de favoritar"
        />
      </button>

      <div>
        <img
          src={ recipeDetails[`str${type}Thumb`] }
          alt={ recipeDetails[`str${type}`] }
          data-testid="recipe-photo"
        />

        <h2 data-testid="recipe-title">{recipeDetails[`str${type}`]}</h2>
        <p data-testid="recipe-category">
          {type === 'Meal'
            ? recipeDetails.strCategory
            : recipeDetails.strAlcoholic}
        </p>

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
            ?.filter((card, index) => index < MAX_CARD_LENGTH && card)
            .map((recipe, index) => {
              const newType = type === 'Meal' ? 'Drink' : 'Meal';

              return (
                <div
                  key={ recipe[`id${newType}`] }
                  data-testid={ `${index}-recommendation-card` }
                  style={ { width: '51%' } }
                >
                  <img
                    src={ recipe[`str${newType}Thumb`] }
                    alt={ recipe[`str${newType}`] }
                  />
                  <h3 data-testid={ `${index}-recommendation-title` }>
                    {recipe[`str${newType}`]}
                  </h3>
                </div>
              );
            })}
        </div>
      </div>

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
