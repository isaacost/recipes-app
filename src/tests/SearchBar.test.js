import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import mealsByIngredient from '../../cypress/mocks/mealsByIngredient';
import oneMeal from '../../cypress/mocks/oneMeal';

const SEARCH_INPUT = 'search-input';
const INGREDIENT_SEARCH_RADIO = 'ingredient-search-radio';
const FIRST_LETTER_SEARCH_RADIO = 'first-letter-search-radio';
const EXEC_SEARCH_BTN = 'exec-search-btn';

describe('Testando component SearchBar', () => {
  it('Testa se todos inputs existem na tela', () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });
    userEvent.click(screen.getByRole('button', { name: /searchicon/i }));

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    expect(searchInput).toBeInTheDocument();
    expect(searchInput.value).toBe('');

    expect(screen.getByTestId(INGREDIENT_SEARCH_RADIO)).toBeInTheDocument();
    expect(screen.getByTestId('name-search-radio')).toBeInTheDocument();
    expect(screen.getByTestId(FIRST_LETTER_SEARCH_RADIO)).toBeInTheDocument();
  });

  it('Testa se botão de pesquisa existe na tela', () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });
    userEvent.click(screen.getByRole('button', { name: /searchicon/i }));

    const searchButton = screen.getByTestId(EXEC_SEARCH_BTN);
    expect(searchButton).toBeInTheDocument();
    expect(searchButton.type).toBe('submit');
  });

  it('Testa se é possível pesquisar por ingredientes', () => {
    // Warning sobre act
    global.fetch = jest.fn(async () => Promise.resolve({
      json: async () => Promise.resolve(mealsByIngredient),
    }));

    renderWithRouter(<App />, { initialEntries: ['/meals'] });
    userEvent.click(screen.getByRole('button', { name: /searchicon/i }));

    userEvent.click(screen.getByTestId('ingredient-search-radio'));
    userEvent.type(screen.getByTestId(SEARCH_INPUT), 'Chicken');
    userEvent.click(screen.getByTestId(EXEC_SEARCH_BTN));

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=Chicken');
  });

  it('Testa se é possível pesquisar por nome', () => {
    // Warning sobre act
    global.fetch = jest.fn(async () => Promise.resolve({
      json: async () => Promise.resolve(oneMeal),
    }));

    renderWithRouter(<App />, { initialEntries: ['/meals'] });
    userEvent.click(screen.getByRole('button', { name: /searchicon/i }));

    userEvent.click(screen.getByTestId('name-search-radio'));
    userEvent.type(screen.getByTestId(SEARCH_INPUT), 'Spicy Arrabiata Penne');
    userEvent.click(screen.getByTestId(EXEC_SEARCH_BTN));

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=Spicy Arrabiata Penne');
  });

  it('Testa se é possível pesquisar pela primeira letra', () => {
    // Warning sobre act
    global.fetch = jest.fn();

    renderWithRouter(<App />, { initialEntries: ['/meals'] });
    userEvent.click(screen.getByRole('button', { name: /searchicon/i }));

    userEvent.click(screen.getByTestId(FIRST_LETTER_SEARCH_RADIO));
    userEvent.type(screen.getByTestId(SEARCH_INPUT), 'a');
    userEvent.click(screen.getByTestId(EXEC_SEARCH_BTN));

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=a');
  });

  it('Testa se um alerta é disparado caso o usuário pesquise por duas letras', async () => {
    global.alert = jest.fn();
    global.fetch = jest.fn(() => global.alert('Your search must have only 1 (one) character'));

    renderWithRouter(<App />, { initialEntries: ['/meals'] });
    userEvent.click(screen.getByRole('button', { name: /searchicon/i }));

    userEvent.click(screen.getByTestId(FIRST_LETTER_SEARCH_RADIO));
    userEvent.type(screen.getByTestId(SEARCH_INPUT), 'aa');
    userEvent.click(screen.getByTestId(EXEC_SEARCH_BTN));

    expect(global.fetch).toHaveBeenCalled();
    expect(global.alert).toHaveBeenCalled();
  });
});
