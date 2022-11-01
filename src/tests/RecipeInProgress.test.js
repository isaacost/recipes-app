import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

import renderWithRouter from './helpers/renderWithRouter';
import * as api from '../services/recipesAPI';

import drinks from '../../cypress/mocks/drinks';
import meals from '../../cypress/mocks/meals';
import oneMeal from '../../cypress/mocks/oneMeal';
import oneDrink from '../../cypress/mocks/oneDrink';

jest.mock('../services/recipesAPI');
jest.mock('clipboard-copy', () => jest.fn());

const copy = require('clipboard-copy');

const FAVORITE_MEAL_MOCK = {
  id: '52771',
  type: 'meal',
  nationality: 'Italian',
  category: 'Vegetarian',
  alcoholicOrNot: '',
  name: 'Spicy Arrabiata Penne',
  image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
};

const FAVORITE_DRINK_MOCK = {
  id: '178319',
  type: 'drink',
  nationality: '',
  category: 'Cocktail',
  alcoholicOrNot: 'Alcoholic',
  name: 'Aquamarine',
  image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
};

const IN_PROGRESS_MEAL_ROUTE = '/meals/52771/in-progress';
const IN_PROGRESS_DRINK_ROUTE = '/drinks/178319/in-progress';

const ONE_DRINK_MOCK = {
  drinks: [
    {
      idDrink: '15997',
      strDrink: 'GG',
      strDrinkAlternate: null,
      strDrinkES: null,
      strDrinkDE: null,
      strDrinkFR: null,
      'strDrinkZH-HANS': null,
      'strDrinkZH-HANT': null,
      strTags: null,
      strVideo: null,
      strCategory: 'Ordinary Drink',
      strIBA: null,
      strAlcoholic: 'Optional alcohol',
      strGlass: 'Collins Glass',
      strInstructions: 'Pour the Galliano liqueur over ice. Fill the remainder of the glass with ginger ale and thats all there is to it. You now have a your very own GG.',
      strInstructionsES: null,
      strInstructionsDE: 'Den Galliano-Likör über Eis gießen. Füllen Sie den Rest des Glases mit Ginger Ale und das ist alles, was dazu gehört. Du hast jetzt ein eigenes GG.',
      strInstructionsFR: null,
      'strInstructionsZH-HANS': null,
      'strInstructionsZH-HANT': null,
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
      strIngredient1: 'Galliano',
      strIngredient2: 'Ginger ale',
      strIngredient3: 'Ice',
      strIngredient4: null,
      strIngredient5: null,
      strIngredient6: null,
      strIngredient7: null,
      strIngredient8: null,
      strIngredient9: null,
      strIngredient10: null,
      strIngredient11: null,
      strIngredient12: null,
      strIngredient13: null,
      strIngredient14: null,
      strIngredient15: null,
      strMeasure1: '2 1/2 shots ',
      strMeasure2: null,
      strMeasure3: null,
      strMeasure4: null,
      strMeasure5: null,
      strMeasure6: null,
      strMeasure7: null,
      strMeasure8: null,
      strMeasure9: null,
      strMeasure10: null,
      strMeasure11: null,
      strMeasure12: null,
      strMeasure13: null,
      strMeasure14: null,
      strMeasure15: null,
      strCreativeCommonsConfirmed: 'No',
      dateModified: '2016-07-18 22:06:00',
    },
  ],
};

const IN_PROGRESS_LOCAL_MOCK = {
  drinks: {
    15997: [
      'Galliano',
    ],
  },
  meals: {},
};

describe('Testando componente RecipeInProgress', () => {
  it('Testa botão de compartilhar', async () => {
    api.getRecipes.mockResolvedValue(drinks);
    api.getRecipeDetails.mockResolvedValue(oneMeal);

    copy.mockImplementation(() => null);
    await act(async () => { renderWithRouter(<App />, IN_PROGRESS_MEAL_ROUTE); });

    const shareButton = screen.getByRole('button', { name: /ícone de compartilhar/i });
    expect(shareButton).toBeInTheDocument();
    expect(shareButton.type).toBe('button');
    expect(screen.getByRole('img', { name: /ícone de compartilhar/i })).toBeInTheDocument();

    expect(screen.queryByText('Link copied!')).toBe(null);
    userEvent.click(shareButton);

    expect(copy).toHaveBeenCalled();

    // Como testar o que tem no clipboard
    const copiedLinkElement = screen.getByText('Link copied!');
    expect(copiedLinkElement).toBeInTheDocument();
    setTimeout(() => expect(copiedLinkElement).not.toBeInTheDocument(), 1000);
  });

  it('Testa botão de favoritar', async () => {
    api.getRecipes.mockResolvedValueOnce(drinks);
    api.getRecipeDetails.mockResolvedValueOnce(oneMeal);

    let history;
    await act(async () => {
      const { history: h } = renderWithRouter(<App />, IN_PROGRESS_MEAL_ROUTE);
      history = h;
    });

    const whiteHeartIcon = 'whiteHeartIcon.svg';
    const blackHeartIcon = 'blackHeartIcon.svg';
    expect(screen.getByRole('img', { name: /ícone de favoritar/i }).src).toContain(whiteHeartIcon);

    await act(async () => { userEvent.click(screen.getByRole('img', { name: /ícone de favoritar/i })); });

    expect(JSON.parse(localStorage.getItem('favoriteRecipes')).length).toBe(1);
    expect(JSON.parse(localStorage.getItem('favoriteRecipes'))[0]).toEqual(FAVORITE_MEAL_MOCK);
    expect(screen.getByRole('img', { name: /ícone de favoritar/i }).src).toContain(blackHeartIcon);

    await act(async () => { userEvent.click(screen.getByRole('img', { name: /ícone de favoritar/i })); });

    expect(JSON.parse(localStorage.getItem('favoriteRecipes')).length).toBe(0);
    expect(screen.getByRole('img', { name: /ícone de favoritar/i }).src).toContain(whiteHeartIcon);

    // Testando drinks
    api.getRecipes.mockResolvedValue(meals);
    api.getRecipeDetails.mockResolvedValue(oneDrink);
    await act(async () => { history.push(IN_PROGRESS_DRINK_ROUTE); });
    expect(screen.getByRole('img', { name: /ícone de favoritar/i }).src).toContain(whiteHeartIcon);

    await act(async () => { userEvent.click(screen.getByRole('img', { name: /ícone de favoritar/i })); });

    expect(screen.getByRole('img', { name: /ícone de favoritar/i }).src).toContain(blackHeartIcon);
    expect(JSON.parse(localStorage.getItem('favoriteRecipes')).length).toBe(1);
    expect(JSON.parse(localStorage.getItem('favoriteRecipes'))[0]).toEqual(FAVORITE_DRINK_MOCK);
  });

  it('Testa se componente Card renderiza recomendações de Meals', async () => {
    api.getRecipes.mockResolvedValueOnce(drinks);
    api.getRecipeDetails.mockResolvedValueOnce(oneMeal);

    await act(async () => { renderWithRouter(<App />, IN_PROGRESS_MEAL_ROUTE); });

    for (let i = 0; i < 6; i += 1) {
      expect(screen.getByTestId(`${i}-recommendation-card`)).toBeInTheDocument();
    }

    const recipePhoto = screen.getByTestId('recipe-photo');
    expect(recipePhoto).toBeInTheDocument();
    expect(recipePhoto.src).toBe(oneMeal.meals[0].strMealThumb);

    const recipeTitle = screen.getByTestId('recipe-title');
    expect(recipeTitle).toBeInTheDocument();
    expect(recipeTitle.innerHTML).toBe(oneMeal.meals[0].strMeal);

    const recipeCategory = screen.getByTestId('recipe-category');
    expect(recipeCategory).toBeInTheDocument();
    expect(recipeCategory.innerHTML).toBe(oneMeal.meals[0].strCategory);
  });

  it('Testa se componente Card renderiza recomendações de Drinks', async () => {
    api.getRecipes.mockResolvedValueOnce(meals);
    api.getRecipeDetails.mockResolvedValueOnce(oneDrink);
    await act(async () => { renderWithRouter(<App />, IN_PROGRESS_DRINK_ROUTE); });

    for (let i = 0; i < 6; i += 1) {
      expect(screen.getByTestId(`${i}-recommendation-card`)).toBeInTheDocument();
    }

    const recipePhoto = screen.getByTestId('recipe-photo');
    expect(recipePhoto).toBeInTheDocument();
    expect(recipePhoto.src).toBe(oneDrink.drinks[0].strDrinkThumb);

    const recipeTitle = screen.getByTestId('recipe-title');
    expect(recipeTitle).toBeInTheDocument();
    expect(recipeTitle.innerHTML).toBe(oneDrink.drinks[0].strDrink);

    const recipeCategory = screen.getByTestId('recipe-category');
    expect(recipeCategory).toBeInTheDocument();
    expect(recipeCategory.innerHTML).toBe(oneDrink.drinks[0].strAlcoholic);
  });

  it('Testa botão de finalizar receita de comida', async () => {
    api.getRecipes.mockResolvedValueOnce(drinks);
    api.getRecipeDetails.mockResolvedValueOnce(oneMeal);

    await act(async () => { renderWithRouter(<App />, IN_PROGRESS_MEAL_ROUTE); });

    const finishRecipeButton = screen.getByTestId('finish-recipe-btn');
    expect(finishRecipeButton).toBeInTheDocument();
    expect(finishRecipeButton.type).toBe('button');
    expect(finishRecipeButton.disabled).toBe(true);

    const checkboxes = screen.getAllByRole('checkbox');
    checkboxes.forEach((checkbox) => {
      userEvent.click(checkbox);
    });

    expect(finishRecipeButton.disabled).toBe(false);

    userEvent.click(finishRecipeButton);

    expect(window.location.pathname).toBe('/done-recipes');
    expect(JSON.parse(localStorage.getItem('doneRecipes')).length).toBe(1);
  });

  it('Testa botão de finalizar receita de bebida', async () => {
    api.getRecipes.mockResolvedValueOnce(meals);
    api.getRecipeDetails.mockResolvedValueOnce(oneDrink);

    await act(async () => {
      renderWithRouter(<App />, IN_PROGRESS_DRINK_ROUTE);
    });

    const finishRecipeButton = screen.getByTestId('finish-recipe-btn');
    expect(finishRecipeButton).toBeInTheDocument();
    expect(finishRecipeButton.type).toBe('button');
    expect(finishRecipeButton.disabled).toBe(true);

    const checkboxes = screen.getAllByRole('checkbox');
    checkboxes.forEach((checkbox) => {
      userEvent.click(checkbox);
    });

    expect(finishRecipeButton.disabled).toBe(false);

    userEvent.click(finishRecipeButton);

    expect(window.location.pathname).toBe('/done-recipes');
    expect(JSON.parse(localStorage.getItem('doneRecipes')).length).toBe(2);
  });

  it('Testa checkbox quando inicializa', async () => {
    api.getRecipes.mockResolvedValueOnce(meals);
    api.getRecipeDetails.mockResolvedValueOnce(ONE_DRINK_MOCK);

    localStorage.setItem('inProgressRecipes', JSON.stringify(IN_PROGRESS_LOCAL_MOCK));
    await act(async () => { renderWithRouter(<App />, '/drinks/15997/in-progress'); });

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes[0].checked).toBe(true);
    expect(checkboxes[0].parentElement.textContent).toBe('2 1/2 shots  Galliano');
    expect(checkboxes[1].checked).toBe(false);

    userEvent.click(checkboxes[1]);
    expect(checkboxes[1].parentElement.style.textDecoration).toBe('line-through solid rgb(0, 0, 0)');
    userEvent.click(checkboxes[1]);
    expect(checkboxes[1].parentElement.style.textDecoration).toBe('');
    expect(checkboxes[1].parentElement.textContent).toBe(' Ginger ale');
  });
});
