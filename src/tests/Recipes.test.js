import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testando componente Recipes', () => {
  it('Testa se botão limpa os filtros de categorias', async () => {
    // global.fetch = jest.fn(async () => Promise.resolve({
    //   json: async () => Promise.resolve(mealCategories),
    // }));

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

    // expect(global.fetch).toHaveBeenCalled();
  });
});
