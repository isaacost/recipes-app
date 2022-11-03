import React, { useEffect, useContext } from 'react';

import { RecipesContext } from '../contexts/RecipesContext';
import { getRecipeDetails } from '../services/recipesAPI';

import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';
import Card from '../components/Card';
import StartButton from '../components/StartButton';

export default function RecipeDetails() {
  const {
    setRecipeDetails,
    recipeType,
    recipeId,
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
      <Card />
      <StartButton />
    </div>
  );
}
