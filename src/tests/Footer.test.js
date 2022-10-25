import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testando componente Footer', () => {
  it('Testando se redireciona para página meals ao clicar na imagem', () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });
    const mealIcon = screen.getByTestId('meals-bottom-btn');
    expect(mealIcon).toBeInTheDocument();

    userEvent.click(mealIcon);
    const { pathname } = history.location;
    expect(pathname).toBe('/meals');
  });
  it('Testando se redireciona para página drinks ao clicar na imagem', () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });
    const drinkIcon = screen.getByTestId('drinks-bottom-btn');
    expect(drinkIcon).toBeInTheDocument();

    userEvent.click(drinkIcon);
    const { pathname } = history.location;
    expect(pathname).toBe('/drinks');
  });
});
