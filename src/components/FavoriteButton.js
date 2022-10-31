import React, { useContext } from 'react';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { RecipesContext } from '../contexts/RecipesContext';

export default function FavoriteButton() {
  const {
    favoriteRecipes,
    setFavoriteRecipes,
    recipeDetails,
    type,
    recipeType,
  } = useContext(RecipesContext);

  const handleFavoriteButton = () => {
    const localFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    const newFavoriteRecipe = {
      id: recipeDetails[`id${type}`],
      type: recipeType.replace('s', ''),
      nationality: recipeDetails.strArea || '',
      category: recipeDetails.strCategory,
      alcoholicOrNot: recipeDetails.strAlcoholic || '',
      name: recipeDetails[`str${type}`],
      image: recipeDetails[`str${type}Thumb`],
    };

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
    </div>
  );
}
