const CATEGORIES_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const NATIONALITIES_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
const INGREDIENTS_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';

export const getMeals = async () => {
  const MEALS_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(MEALS_ENDPOINT);
  const data = await response.json();

  const meals = [];
  const numberOfMeals = 12;

  data.meals.forEach((meal, index) => {
    if (index < numberOfMeals) meals.push(meal);
  });

  return meals;
};

export const getMealsByName = async (meal) => {
  const MEAL_BY_NAME_ENDPOINT = `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`;

  try {
    const response = await fetch(MEAL_BY_NAME_ENDPOINT);
    const { meals } = await response.json();
    return meals;
  } catch (error) {
    console.log(error);
  }
};

export const getMealsCategories = async () => {
  const response = await fetch(CATEGORIES_ENDPOINT);
  const { meals } = await response.json();
  return meals;
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

export const getMealsByIngredient = async (ingredient) => {
  const SEARCH_INGREDIENT_ENDPOINT = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;

  try {
    const response = await fetch(SEARCH_INGREDIENT_ENDPOINT);
    const { meals } = await response.json();
    return meals;
  } catch (error) {
    console.log(error);
  }
};

export const getMealsByFirstLetter = async (firstLetter) => {
  const FIRST_LETTER_ENDPOINT = `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`;

  try {
    const response = await fetch(FIRST_LETTER_ENDPOINT);
    const { meals } = await response.json();
    return meals;
  } catch (error) {
    global.alert('Your search must have only 1 (one) character');
  }
};

export const getIngredientImage = (ingredient) => `https://www.themealdb.com/images/ingredients/${ingredient}-Small.png`;
