import { ENDPOINT } from '../constants/constants';

export const getRecipes = async (recipeType) => {
  const endpoint = recipeType === 'meals'
    ? ENDPOINT.MEALS_RECIPES
    : ENDPOINT.DRINKS_RECIPES;

  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getRecipesByName = async (recipeName, recipeType) => {
  const endpoint = recipeType === 'meals'
    ? `${ENDPOINT.MEALS_RECIPES}${recipeName}`
    : `${ENDPOINT.DRINKS_RECIPES}${recipeName}`;

  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getRecipesByIngredient = async (ingredientName, recipeType) => {
  const endpoint = recipeType === 'meals'
    ? `${ENDPOINT.MEALS_BY_INGREDIENT}${ingredientName}`
    : `${ENDPOINT.DRINKS_BY_INGREDIENT}${ingredientName}`;

  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getRecipesByFirstLetter = async (firstLetter, recipeType) => {
  const endpoint = recipeType === 'meals'
    ? `${ENDPOINT.MEALS_BY_FIRST_LETTER}${firstLetter}`
    : `${ENDPOINT.DRINKS_BY_FIRST_LETTER}${firstLetter}`;

  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  } catch (error) {
    global.alert('Your search must have only 1 (one) character');
  }
};

export const getRecipesCategories = async (categoryType) => {
  const endpoint = categoryType === 'meals'
    ? ENDPOINT.MEALS_CATEGORIES
    : ENDPOINT.DRINKS_CATEGORIES;

  try {
    const response = await fetch(endpoint);
    const data = response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getRecipesByCategory = async (categoryName, categoryType) => {
  const endpoint = categoryType === 'meals'
    ? `${ENDPOINT.MEALS_BY_CATEGORY}${categoryName}`
    : `${ENDPOINT.DRINKS_BY_CATEGORY}${categoryName}`;

  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getRecipeDetails = async (recipeId, recipeType) => {
  const endpoint = recipeType === 'meals'
    ? `${ENDPOINT.MEAL_DETAILS}${recipeId}`
    : `${ENDPOINT.DRINK_DETAILS}${recipeId}`;

  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
