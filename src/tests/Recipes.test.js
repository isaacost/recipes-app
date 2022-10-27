import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
// import { getRecipes } from '../services/recipesAPI';
// import meals from '../../cypress/mocks/meals';

describe('Testando componente Recipes', () => {
  it('Testa se botão limpa os filtros de categorias', async () => {
    // getRecipes = jest.fn.mockImplementation(async () => Promise.resolve({
    //   json: async () => Promise.resolve(mealCategories),
    // }));

    // jest.mock('getRecipes', () => jest.fn.mockImplementation(async () => Promise.resolve({
    //   json: async () => Promise.resolve(meals),
    // })));

    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const filterButton = await screen.findByRole('button', { name: /beef/i });
    expect(filterButton).toBeInTheDocument();

    const mealFirstImage = await screen.findByRole('img', { name: /corba/i });
    expect(mealFirstImage).toBeInTheDocument();

    userEvent.click(filterButton);

    await waitFor(() => {
      expect(mealFirstImage).not.toBeInTheDocument();
    });

    const allButton = await screen.findByTestId('All-category-filter');
    expect(allButton).toBeInTheDocument();
    userEvent.click(allButton);

    await waitFor(() => {
      expect(screen.getByRole('img', { name: /corba/i })).toBeInTheDocument();
    });

    // expect(getRecipes).toHaveBeenCalled();
  });
});
