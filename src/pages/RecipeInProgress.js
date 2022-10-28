import React from 'react';
import Card from '../components/Card';
import FavoriteButton from '../components/FavoriteButton';
import ShareButton from '../components/ShareButton';
import StartButton from '../components/StartButton';

export default function RecipeInProgress() {
  return (
    <div>
      <ShareButton />
      <FavoriteButton />
      <Card />

      <button
        type="button"
        data-testid="finish-recipe-btn"
      >
        Finish Recipe
      </button>
    </div>
  );
}
