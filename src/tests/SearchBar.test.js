import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import ingredientsMock from './mocks/ingredientsMock';
import mealMock from './mocks/mealMock';
import firstLetterMock from './mocks/firstLetterMock';
import drinksMock from './mocks/drinksMock';
import mealsMock from './mocks/mealsMock';

const SEARCH_INPUT = 'search-input';
const INGREDIENT_SEARCH_RADIO = 'ingredient-search-radio';
const EXEC_SEARCH_BTN = 'exec-search-btn';

describe('Testando component SearchBar', () => {
  beforeEach(() => {
    // global.fetch = jest.fn(async () => Promise.resolve({
    //   json: async () => Promise.resolve(drinksMock),
    // }));

    // global.fetch = jest.fn(async () => Promise.resolve({
    //   json: async () => Promise.resolve(mealsMock),
    // }));

    renderWithRouter(<App />, { initialEntries: ['/meals'] });
    userEvent.click(screen.getByRole('button', { name: /searchicon/i }));
  });

  it('Testa se todos inputs existem na tela', () => {
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    expect(searchInput).toBeInTheDocument();
    expect(searchInput.value).toBe('');

    expect(screen.getByTestId(INGREDIENT_SEARCH_RADIO)).toBeInTheDocument();
    expect(screen.getByTestId('name-search-radio')).toBeInTheDocument();
    expect(screen.getByTestId('first-letter-search-radio')).toBeInTheDocument();
  });

  it('Testa se botão de pesquisa existe na tela', () => {
    const searchButton = screen.getByTestId(EXEC_SEARCH_BTN);
    expect(searchButton).toBeInTheDocument();
    expect(searchButton.type).toBe('submit');
  });

  it('Testa se é possível pesquisar por ingredientes', () => {
    global.fetch = jest.fn(async () => Promise.resolve({
      json: async () => Promise.resolve(ingredientsMock),
    }));

    userEvent.click(screen.getByTestId(INGREDIENT_SEARCH_RADIO));
    userEvent.type(screen.getByTestId(SEARCH_INPUT), 'sugar');
    userEvent.click(screen.getByTestId(EXEC_SEARCH_BTN));

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=sugar');
  });

  // it('Testa se é possível pesquisar por nome', () => {
  //   global.fetch = jest.fn(async () => Promise.resolve({
  //     json: async () => Promise.resolve(mealMock),
  //   }));

  //   userEvent.click(screen.getByTestId(INGREDIENT_SEARCH_RADIO));
  //   userEvent.type(screen.getByTestId(SEARCH_INPUT), 'Three Fish Pie');
  //   userEvent.click(screen.getByTestId(EXEC_SEARCH_BTN));

  //   expect(global.fetch).toHaveBeenCalledTimes(1);
  //   expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=Three Fish Pie');
  // });

  // it('Testa se é possível pesquisar pela primeira letra', () => {
  //   global.fetch = jest.fn(async () => Promise.resolve({
  //     json: async () => Promise.resolve(firstLetterMock),
  //   }));

  //   userEvent.click(screen.getByTestId('ingredient-search-radio'));
  //   userEvent.type(screen.getByTestId(SEARCH_INPUT), 'a');
  //   userEvent.click(screen.getByTestId(EXEC_SEARCH_BTN));

  //   expect(global.fetch).toHaveBeenCalledTimes(1);
  //   expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=a');
  // });

  // it.only('Testa se um alerta é disparado caso o usuário pesquise por duas letras', async () => {
  // global.fetch = jest.fn(() => new Error('foo'));
  // global.alert = jest.fn();

  // expect(global.fetch).toThrowError(new Error('foo'));
  // expect(global.alert).toHaveBeenCalledTimes(1);

  // try {
  //   await testContext.httpService.post('url', { data: {} }); // using jest with testContext
  // } catch (error) {
  //   expect(error.alert).toBeInTheDocument();
  // }
  // });
});
