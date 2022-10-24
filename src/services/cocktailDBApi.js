const COCKTAILS_ENDPOINT = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

export const getCocktails = async () => {
  const response = await fetch(COCKTAILS_ENDPOINT);
  const data = await response.json();

  const drinks = [];
  const numberOfDrinks = 12;

  data.drinks.forEach((drink, index) => {
    if (index < numberOfDrinks) drinks.push(drink);
  });

  return drinks;
};

export const getDrinksByName = async (drink) => {
  const DRINK_BY_NAME_ENDPOINT = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`;
  const response = await fetch(DRINK_BY_NAME_ENDPOINT);
  const { drinks } = await response.json();
  return drinks;
};
