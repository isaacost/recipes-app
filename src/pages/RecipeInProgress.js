import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '../components/Card';
import { RecipesContext } from '../contexts/RecipesContext';
import { getRecipeDetails } from '../services/recipesAPI';

export default function RecipeInProgress() {
  const {
    setRecipeDetails,
    recipeId,
    ingredientsList,
    usedIngredients,
    recipeDetails,
    type,
  } = useContext(RecipesContext);

  const history = useHistory();
  const recipeType = history.location.pathname.split('/')[1];

  useEffect(() => {
    const fetch = async () => {
      const newRecipeDetails = await getRecipeDetails(recipeId, recipeType);
      setRecipeDetails(newRecipeDetails[recipeType][0]);
    };

    fetch();
  }, [recipeId, recipeType, setRecipeDetails]);

  const markRecipeDone = () => {
    history.push('/done-recipes');

    const localDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

    const newDoneRecipe = {
      id: recipeDetails[`id${type}`],
      type: recipeType.replace('s', ''),
      nationality: recipeDetails.strArea || '',
      category: recipeDetails.strCategory,
      alcoholicOrNot: recipeDetails.strAlcoholic || '',
      name: recipeDetails[`str${type}`],
      image: recipeDetails[`str${type}Thumb`],
      doneDate: new Date().toLocaleString('pt-br'),
      tags: recipeDetails.strTags?.split(',') || [],
    };

    localStorage.setItem(
      'doneRecipes',
      JSON.stringify([...localDoneRecipes, newDoneRecipe]),
    );
  };

  return (
    <div>
      <Card />

      <div className="mx-auto w-[80%]">
        <button
          type="button"
          data-testid="finish-recipe-btn"
          disabled={ usedIngredients.length !== ingredientsList.length }
          onClick={ markRecipeDone }
          className={ `my-10 bg-amber-400 text-purple-800 font-bold p-2 
        rounded w-full hover:bg-amber-300 disabled:bg-slate-400 disabled:text-white` }
        >
          Finish Recipe
        </button>
      </div>
    </div>
  );
}
