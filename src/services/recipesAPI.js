const NATIONALITIES_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
const INGREDIENTS_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';

export const getRecipes = async (recipeType) => {
  const RECIPES_ENDPOINT = recipeType === 'meals'
    ? 'https://www.themealdb.com/api/json/v1/1/search.php?s='
    : 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  const response = await fetch(RECIPES_ENDPOINT);
  const data = await response.json();

  const recipes = [];
  const numberOfRecipes = 12;

  console.log(recipeType);
  data[recipeType].forEach((recipe, index) => {
    if (index < numberOfRecipes) recipes.push(recipe);
  });

  return recipes;
};

export const getRecipesByName = async (recipeName, recipeType) => {
  const BY_NAME_ENDPOINT = recipeType === 'meals'
    ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${recipeName}`
    : `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${recipeName}`;

  try {
    const response = await fetch(BY_NAME_ENDPOINT);
    const data = await response.json();
    return data[recipeType];
  } catch (error) {
    console.log(error);
  }
};

export const getRecipesByIngredient = async (ingredientName, recipeType) => {
  const BY_INGREDIENT_ENDPOINT = recipeType === 'meals'
    ? `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientName}`
    : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredientName}`;

  try {
    const response = await fetch(BY_INGREDIENT_ENDPOINT);
    const data = await response.json();
    return data[recipeType];
  } catch (error) {
    console.log(error);
  }
};

export const getRecipesByFirstLetter = async (firstLetter, recipeType) => {
  const BY_FIRST_LETTER_ENDPOINT = recipeType === 'meals'
    ? `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`
    : `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`;

  try {
    const response = await fetch(BY_FIRST_LETTER_ENDPOINT);
    const data = await response.json();
    console.log(data);
    return data[recipeType];
  } catch (error) {
    global.alert('Your search must have only 1 (one) character');
  }
};

export const getRecipesCategories = async (categoryType) => {
  const CATEGORIES_ENDPOINT = categoryType === 'meals'
    ? 'https://www.themealdb.com/api/json/v1/1/list.php?c=list'
    : 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

  const response = await fetch(CATEGORIES_ENDPOINT);
  const data = await response.json();
  const MAX_CATEGORIES_LENGTH = 5;

  return data[categoryType].reduce((acc, category, index) => {
    if (index < MAX_CATEGORIES_LENGTH) acc.push(category);
    return acc;
  }, []);
};

export const getRecipesByCategory = async (categoryName, categoryType) => {
  const BY_CATEGORY_ENDPOINT = categoryType === 'meals'
    ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
    : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categoryName}`;

  const response = await fetch(BY_CATEGORY_ENDPOINT);
  const data = await response.json();
  return data[categoryType];
};

export const getNationalities = async () => {
  const response = await fetch(NATIONALITIES_ENDPOINT);
  const { meals } = await response.json();
  return meals;
};

export const getIngredients = async () => {
  const response = await fetch(INGREDIENTS_ENDPOINT);
  const { meals } = await response.json();
  return meals;
};

export const getIngredientImage = (ingredient) => `https://www.themealdb.com/images/ingredients/${ingredient}-Small.png`;
