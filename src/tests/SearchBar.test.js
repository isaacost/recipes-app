import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import mealsByIngredient from '../../cypress/mocks/mealsByIngredient';
import oneMeal from '../../cypress/mocks/oneMeal';
import meals from '../../cypress/mocks/meals';
import firstLetterMock from './helpers/firstLetterMock';
import mealCategories from '../../cypress/mocks/mealCategories';
import * as api from '../services/recipesAPI';

jest.mock('../services/recipesAPI');

const SEARCH_INPUT = 'search-input';
const INGREDIENT_SEARCH_RADIO = 'ingredient-search-radio';
const FIRST_LETTER_SEARCH_RADIO = 'first-letter-search-radio';
const EXEC_SEARCH_BTN = 'exec-search-btn';

describe('Testando component SearchBar', () => {
  it('Testa se todos inputs existem na tela', async () => {
    api.getRecipes.mockResolvedValue(meals);
    api.getRecipesCategories.mockResolvedValue(mealCategories);
    await act(async () => { renderWithRouter(<App />, '/meals'); });

    userEvent.click(screen.getByRole('button', { name: /searchicon/i }));

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    expect(searchInput).toBeInTheDocument();
    expect(searchInput.value).toBe('');

    expect(screen.getByTestId(INGREDIENT_SEARCH_RADIO)).toBeInTheDocument();
    expect(screen.getByTestId('name-search-radio')).toBeInTheDocument();
    expect(screen.getByTestId(FIRST_LETTER_SEARCH_RADIO)).toBeInTheDocument();
  });

  it('Testa se botão de pesquisa existe na tela', async () => {
    api.getRecipes.mockResolvedValue(meals);
    api.getRecipesCategories.mockResolvedValue(mealCategories);
    await act(async () => { renderWithRouter(<App />, '/meals'); });

    userEvent.click(screen.getByRole('button', { name: /searchicon/i }));

    const searchButton = screen.getByTestId(EXEC_SEARCH_BTN);
    expect(searchButton).toBeInTheDocument();
    expect(searchButton.type).toBe('submit');
  });

  it('Testa se é possível pesquisar por ingredientes', async () => {
    api.getRecipes.mockResolvedValue(meals);
    api.getRecipesCategories.mockResolvedValue(mealCategories);
    api.getRecipesByIngredient.mockResolvedValue(mealsByIngredient);
    await act(async () => { renderWithRouter(<App />, '/meals'); });

    userEvent.click(screen.getByRole('button', { name: /searchicon/i }));
    userEvent.click(screen.getByTestId('ingredient-search-radio'));
    userEvent.type(screen.getByTestId(SEARCH_INPUT), 'Chicken');

    await act(async () => { userEvent.click(screen.getByTestId(EXEC_SEARCH_BTN)); });
    expect(api.getRecipesByIngredient).toHaveBeenCalled();
    expect(screen.getByRole('img', { name: /brown stew chicken/i })).toBeInTheDocument();
  });

  it('Testa se é possível pesquisar por nome', async () => {
    api.getRecipes.mockResolvedValue(meals);
    api.getRecipesCategories.mockResolvedValue(mealCategories);
    api.getRecipesByName.mockResolvedValue(oneMeal);
    api.getRecipeDetails.mockResolvedValue(oneMeal);
    await act(async () => { renderWithRouter(<App />, '/meals'); });

    userEvent.click(screen.getByRole('button', { name: /searchicon/i }));
    userEvent.click(screen.getByTestId('name-search-radio'));
    userEvent.type(screen.getByTestId(SEARCH_INPUT), 'Spicy Arrabiata Penne');
    await act(async () => { userEvent.click(screen.getByTestId(EXEC_SEARCH_BTN)); });

    expect(api.getRecipesByName).toHaveBeenCalled();
    expect(api.getRecipeDetails).toHaveBeenCalled();
    expect(screen.getByRole('img', { name: /spicy arrabiata penne/i })).toBeInTheDocument();
  });

  it('Testa se é possível pesquisar pela primeira letra', async () => {
    api.getRecipes.mockResolvedValue(meals);
    api.getRecipesCategories.mockResolvedValue(mealCategories);
    api.getRecipesByFirstLetter.mockResolvedValue(firstLetterMock);
    await act(async () => { renderWithRouter(<App />, '/meals'); });

    userEvent.click(screen.getByRole('button', { name: /searchicon/i }));
    userEvent.click(screen.getByTestId(FIRST_LETTER_SEARCH_RADIO));
    userEvent.type(screen.getByTestId(SEARCH_INPUT), 'a');
    await act(async () => { userEvent.click(screen.getByTestId(EXEC_SEARCH_BTN)); });

    expect(api.getRecipesByFirstLetter).toHaveBeenCalled();
    expect(screen.getByRole('img', { name: /apple frangipan tart/i })).toBeInTheDocument();
  });
});
