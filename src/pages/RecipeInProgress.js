import React, { useContext, useEffect } from 'react';
import Card from '../components/Card';
import FavoriteButton from '../components/FavoriteButton';
import ShareButton from '../components/ShareButton';
import { RecipesContext } from '../contexts/RecipesContext';
import { getRecipeDetails } from '../services/recipesAPI';

export default function RecipeInProgress() {
  const {
    setRecipeDetails,
    recipeType,
    recipeId,
    ingredientsList,
    usedIngredients,
  } = useContext(RecipesContext);

  useEffect(() => {
    const fetch = async () => {
      const newRecipeDetails = await getRecipeDetails(recipeId, recipeType);
      setRecipeDetails(newRecipeDetails[[recipeType]][0]);
    };

    fetch();
  }, [recipeId, recipeType, setRecipeDetails]);

  return (
    <div>
      <ShareButton />
      <FavoriteButton />
      <Card />

      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ usedIngredients.length !== ingredientsList.length }
      >
        Finish Recipe
      </button>
    </div>
  );
}
