import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, act } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
// import { getRecipes } from '../services/recipesAPI';
import meals from '../../cypress/mocks/meals';
import drinks from '../../cypress/mocks/drinks';
import beefMeals from '../../cypress/mocks/beefMeals';
import cocoaDrinks from '../../cypress/mocks/cocoaDrinks';
import mealCategories from '../../cypress/mocks/mealCategories';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import * as api from '../services/recipesAPI';

jest.mock('../services/recipesAPI');

describe('Testando componente Recipes', () => {
  it('Testa se botão limpa os filtros de categorias', async () => {
    api.getRecipes.mockResolvedValue(meals);
    api.getRecipesCategories.mockResolvedValue(mealCategories);
    api.getRecipesByCategory.mockResolvedValue(beefMeals);

    await act(async () => { renderWithRouter(<App />, '/meals'); });

    expect(api.getRecipes).toHaveBeenCalled();
    expect(api.getRecipesCategories).toHaveBeenCalled();

    const filterButton = await screen.findByRole('button', { name: /beef/i });
    expect(filterButton).toBeInTheDocument();

    const mealFirstImage = await screen.findByRole('img', { name: /corba/i });
    expect(mealFirstImage).toBeInTheDocument();

    await act(async () => { userEvent.click(filterButton); });
    expect(mealFirstImage).not.toBeInTheDocument();

    const allButton = await screen.findByTestId('All-category-filter');
    expect(allButton).toBeInTheDocument();

    await act(async () => userEvent.click(allButton));
    expect(screen.getByRole('img', { name: /corba/i })).toBeInTheDocument();
  });

  it('Testa componente Drinks', async () => {
    api.getRecipes.mockResolvedValue(drinks);
    api.getRecipesCategories.mockResolvedValue(drinkCategories);
    api.getRecipesByCategory.mockResolvedValue(cocoaDrinks);

    await act(async () => { renderWithRouter(<App />, '/drinks'); });

    for (let i = 0; i < 12; i += 1) {
      expect(screen.getByTestId(`${i}-recipe-card`)).toBeInTheDocument();
    }

    const filterButton = await screen.findByRole('button', { name: /cocoa/i });
    expect(filterButton).toBeInTheDocument();
    await act(async () => userEvent.click(filterButton));
    expect(api.getRecipesByCategory).toHaveBeenCalled();
    expect(screen.getByRole('img', { name: /castillian hot chocolate/i })).toBeInTheDocument();
    await act(async () => userEvent.click(filterButton));
    expect(api.getRecipes).toHaveBeenCalled();
    expect(screen.getByRole('img', { name: /gg/i })).toBeInTheDocument();
  });
});
