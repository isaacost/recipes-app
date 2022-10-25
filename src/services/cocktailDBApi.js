const COCKTAILS_ENDPOINT = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

export const getCocktails = async () => {
  const response = await fetch(COCKTAILS_ENDPOINT);
  const data = await response.json();
  console.log(data.drinks);

  const drinks = [];
  const numberOfDrinks = 12;

  data.drinks.forEach((drink, index) => {
    if (index < numberOfDrinks) drinks.push(drink);
  });

  return drinks;
};

export const getDrinksByName = async (drink) => {
  const DRINK_BY_NAME_ENDPOINT = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`;

  try {
    const response = await fetch(DRINK_BY_NAME_ENDPOINT);
    const { drinks } = await response.json();
    return drinks;
  } catch (error) {
    console.log(error);
  }
};

export const getDrinksByIngredient = async (ingredient) => {
  const SEARCH_INGREDIENT_ENDPOINT = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;

  try {
    const response = await fetch(SEARCH_INGREDIENT_ENDPOINT);
    const { drinks } = await response.json();
    return drinks;
  } catch (error) {
    console.log(error);
  }
};

export const getDrinksByFirstLetter = async (firstLetter) => {
  const FIRST_LETTER_ENDPOINT = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`;

  try {
    const response = await fetch(FIRST_LETTER_ENDPOINT);
    const { drinks } = await response.json();
    return drinks;
  } catch (error) {
    global.alert('Your search must have only 1 (one) character');
  }
};
