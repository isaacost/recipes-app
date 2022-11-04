import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { RecipesContext } from '../contexts/RecipesContext';
import { getRecipes } from '../services/recipesAPI';
import CheckboxList from './CheckboxList';
import FavoriteButton from './FavoriteButton';
import IngredientsList from './IngredientsList';
import ShareButton from './ShareButton';

const MAX_CARD_LENGTH = 6;

export default function Card() {
  const history = useHistory();
  const { pathname } = history.location;

  const {
    type,
    recipeType,
    recipeDetails,
  } = useContext(RecipesContext);

  const [recommendationsList, setRecommendationsList] = useState([]);
  const youtubeLink = recipeDetails.strYoutube?.replace('watch?v=', 'embed/');

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
      <div className="bg-purple-800 flex justify-between p-4 ">
        <h2
          className="font-bold text-center uppercase text-amber-400 text-3xl"
          data-testid="recipe-title"
        >
          {recipeDetails[`str${type}`]}
        </h2>

        <div className="flex gap-4">
          <ShareButton />
          <FavoriteButton />
        </div>
      </div>

      <img
        src={ recipeDetails[`str${type}Thumb`] }
        alt={ recipeDetails[`str${type}`] }
        data-testid="recipe-photo"
        className="mb-10"
      />

      <div className="px-6">
        <p data-testid="recipe-category" className="text-xl text-right">
          <span className="font-bold">Category: </span>
          {type === 'Meal'
            ? recipeDetails.strCategory
            : recipeDetails.strAlcoholic}
        </p>

        {pathname.includes('in-progress')
          ? <CheckboxList />
          : <IngredientsList />}

        <div>
          <h3 className="font-bold text-xl mt-4 mb-2">Instructions: </h3>
          <p
            className="border p-4 rounded"
            data-testid="instructions"
          >
            {recipeDetails.strInstructions}
          </p>
        </div>

        {youtubeLink && youtubeLink !== '' && (
          <iframe
            data-testid="video"
            title="YouTube video player"
            className="w-full h-80 rounded my-4"
            src={ youtubeLink }
          />
        )}

        <div>
          <h3 className="font-bold text-xl mb-4 mt-10">Recommendations: </h3>
          <div className="grid grid-cols-3 gap-2">
            {recommendationsList
              ?.filter((card, index) => index < MAX_CARD_LENGTH && card)
              .map((recipe, index) => {
                const newType = type === 'Meal' ? 'Drink' : 'Meal';

                return (
                  <div
                    key={ recipe[`id${newType}`] }
                    data-testid={ `${index}-recommendation-card` }
                    className="border rounded shadow"
                  >
                    <img
                      src={ recipe[`str${newType}Thumb`] }
                      alt={ recipe[`str${newType}`] }
                      className="w-full rounded"
                    />
                    <h3 className="p-2" data-testid={ `${index}-recommendation-title` }>
                      {recipe[`str${newType}`]}
                    </h3>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
