import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, act } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
// import { getRecipes } from '../services/recipesAPI';
import meals from '../../cypress/mocks/meals';
import beefMeals from '../../cypress/mocks/beefMeals';
import mealCategories from '../../cypress/mocks/mealCategories';
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
});
