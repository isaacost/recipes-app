import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import ONE_DRINK_MOCK from './helpers/oneDrinkMock';
import meals from '../../cypress/mocks/meals';
import * as api from '../services/recipesAPI';

jest.mock('../services/recipesAPI');

const IN_PROGRESS_LOCAL_MOCK = {
  drinks: {
    15997: [
      'Galliano',
    ],
  },
  meals: {},
};

const DONE_RECIPE_MOCK = [
  {
    id: '15997',
    type: 'drink',
    nationality: '',
    category: 'Ordinary Drink',
    alcoholicOrNot: 'Optional alcohol',
    name: 'GG',
    image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
    doneDate: '2022-11-01T21:36:01.933Z',
    tags: [],
  },
];

describe('Testando componente RecipeDetails', () => {
  it.only('Testando lista de ingredientes', async () => {
    api.getRecipes.mockResolvedValue(meals);
    api.getRecipeDetails.mockResolvedValue(ONE_DRINK_MOCK);

    // global.fetch = jest.fn(async (endpoint) => ({
    //   json: async () => {
    //     console.log(endpoint);
    //     if (endpoint === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') {
    //       return meals;
    //     }

    //     if (endpoint === 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15997') {
    //       return ONE_DRINK_MOCK;
    //     }
    //   },
    // }));

    await act(async () => { renderWithRouter(<App />, '/drinks/15997'); });

    const listItems = screen.getAllByRole('listitem');
    expect(listItems.length).toBe(3);
    expect(listItems[0].textContent).toBe('2 1/2 shots  Galliano');
    expect(listItems[1].textContent).toBe(' Ginger ale');
  });

  it('Testa botão de iniciar receita', async () => {
    api.getRecipes.mockResolvedValue(meals);
    api.getRecipeDetails.mockResolvedValue(ONE_DRINK_MOCK);

    let history;
    await act(async () => {
      const { history: h } = renderWithRouter(<App />, '/drinks/15997');
      history = h;
    });

    const startButton = screen.getByTestId('start-recipe-btn');
    expect(startButton).toBeInTheDocument();
    expect(startButton.textContent).toBe('Start Recipe');
    await act(async () => userEvent.click(startButton));
    expect(history.location.pathname).toBe('/drinks/15997/in-progress');
  });

  it('Testa botão de iniciar receita', async () => {
    api.getRecipes.mockResolvedValue(meals);
    api.getRecipeDetails.mockResolvedValue(ONE_DRINK_MOCK);

    localStorage.setItem('inProgressRecipes', JSON.stringify(IN_PROGRESS_LOCAL_MOCK));
    await act(async () => {
      renderWithRouter(<App />, '/drinks/15997');
    });

    const startButton = screen.getByTestId('start-recipe-btn');
    expect(startButton.textContent).toBe('Continue Recipe');
  });

  it('Testa se botão de iniciar receita não aparece na tela', async () => {
    api.getRecipes.mockResolvedValue(meals);
    api.getRecipeDetails.mockResolvedValue(ONE_DRINK_MOCK);

    localStorage.setItem('doneRecipes', JSON.stringify(DONE_RECIPE_MOCK));
    await act(async () => {
      renderWithRouter(<App />, '/drinks/15997');
    });

    expect(screen.queryByTestId('start-recipe-btn')).toBe(null);
  });
});
