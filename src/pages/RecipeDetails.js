import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getRecipeDetails, getRecipes } from '../services/recipesAPI';

const MAX_CARD_LENGTH = 6;

export default function RecipeDetails() {
  const history = useHistory();
  const [recipeDetails, setRecipeDetails] = useState({});
  const [recommendationsList, setRecommendationsList] = useState([]);
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
      console.log(await getRecipeDetails(recipeId, recipeType));
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

  return (
    <div>
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
    </div>
  );
}
