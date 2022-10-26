const NATIONALITIES_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
const INGREDIENTS_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';

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

// export const getMeals = async () => {
//   const MEALS_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
//   const response = await fetch(MEALS_ENDPOINT);
//   const data = await response.json();

//   const meals = [];
//   const numberOfMeals = 12;

//   data.meals.forEach((meal, index) => {
//     if (index < numberOfMeals) meals.push(meal);
//   });

//   return meals;
// };
