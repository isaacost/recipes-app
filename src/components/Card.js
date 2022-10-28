import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { RecipesContext } from '../contexts/RecipesContext';
import { getRecipes } from '../services/recipesAPI';
import CheckboxList from './CheckboxList';
import IngredientsList from './IngredientsList';

const MAX_CARD_LENGTH = 6;

export default function Card() {
  const { type, recipeDetails, recipeType } = useContext(RecipesContext);
  const [recommendationsList, setRecommendationsList] = useState([]);
  const youtubeLink = recipeDetails.strYoutube?.replace('watch?v=', 'embed/');
  const history = useHistory();
  const { pathname } = history.location;

  useEffect(() => {
    const fetch = async () => {
      const recommendationType = recipeType === 'meals' ? 'drinks' : 'meals';
      const newRecommendationsList = await getRecipes(recommendationType);
      setRecommendationsList(newRecommendationsList[recommendationType]);
    };
    fetch();
  }, [recipeType]);

  return (
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

      {pathname.includes('in-progress')
        ? <CheckboxList />
        : <IngredientsList />}

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
  );
}
