import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';

import App from '../App';
import ONE_DRINK_MOCK from './mocks/oneDrinkMock';
import meals from './mocks/meals';
import { ENDPOINT } from '../constants/constants';
import DONE_RECIPE_MOCK from './mocks/doneRecipeMock';

const IN_PROGRESS_LOCAL_MOCK = {
  drinks: {
    15997: [
      'Galliano',
    ],
  },
  meals: {},
};

const DRINK_ROUTE = '/drinks/15997';
const START_RECIPE_BUTTON_TESTID = 'start-recipe-btn';

describe('Testando componente RecipeDetails', () => {
  beforeEach(() => {
    global.fetch = jest.fn(async (endpoint) => ({
      json: async () => {
        if (endpoint === ENDPOINT.MEALS_RECIPES) return meals;
        if (endpoint === `${ENDPOINT.DRINK_DETAILS}15997`) return ONE_DRINK_MOCK;
      },
    }));
  });

  it('Testando lista de ingredientes', async () => {
    await act(async () => { renderWithRouter(<App />, DRINK_ROUTE); });

    const listItems = screen.getAllByRole('listitem');
    expect(listItems.length).toBe(3);
    expect(listItems[0].textContent).toBe('2 1/2 shots  Galliano');
    expect(listItems[1].textContent).toBe(' Ginger ale');
  });

  it('Testa botão de iniciar receita', async () => {
    let history;
    await act(async () => {
      const { history: h } = renderWithRouter(<App />, DRINK_ROUTE);
      history = h;
    });

    const startButton = screen.getByTestId(START_RECIPE_BUTTON_TESTID);
    expect(startButton).toBeInTheDocument();
    expect(startButton.textContent).toBe('Start Recipe');
    await act(async () => userEvent.click(startButton));
    expect(history.location.pathname).toBe('/drinks/15997/in-progress');
  });

  it('Testa botão de iniciar receita', async () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(IN_PROGRESS_LOCAL_MOCK));
    await act(async () => { renderWithRouter(<App />, DRINK_ROUTE); });
    const startButton = screen.getByTestId(START_RECIPE_BUTTON_TESTID);
    expect(startButton.textContent).toBe('Continue Recipe');
  });

  it('Testa se botão de iniciar receita não aparece na tela', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(DONE_RECIPE_MOCK));
    await act(async () => { renderWithRouter(<App />, DRINK_ROUTE); });
    expect(screen.queryByTestId(START_RECIPE_BUTTON_TESTID)).toBe(null);
  });
});
