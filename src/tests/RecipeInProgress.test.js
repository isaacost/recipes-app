import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
// import * as api from '../services/recipesAPI';
// import drinks from '../../cypress/mocks/drinks';

// jest.mock('../services/recipesAPI');

const setLocalStorage = (id, data) => {
  window.localStorage.setItem(id, JSON.stringify(data));
};

const FAVORITE_RECIPE_MOCK = {
  id: '52771',
  type: 'meal',
  nationality: 'Italian',
  category: 'Vegetarian',
  alcoholicOrNot: '',
  name: 'Spicy Arrabiata Penne',
  image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
};

describe('Testando componente RecipeInProgress', () => {
  it('Testa botão de compartilhar', async () => {
    // 1. se ta na tela
    // 2. se copia link
    // 3. se aparece mensagem

    await act(async () => { renderWithRouter(<App />, { initialEntries: ['/meals/52771/in-progress'] }); });

    const shareButton = screen.getByRole('button', { name: /ícone de compartilhar/i });
    expect(shareButton).toBeInTheDocument();
    // userEvent.click(shareButton);
  });

  it('Testa botão de favoritar', async () => {
    await act(async () => { renderWithRouter(<App />, { initialEntries: ['/meals/52771/in-progress'] }); });

    localStorage.clear();

    const favoriteButton = screen.getByRole('img', { name: /ícone de favoritar/i });
    expect(favoriteButton.src).toContain('whiteHeartIcon.svg');
    userEvent.click(favoriteButton);
    expect(favoriteButton.src).toContain('blackHeartIcon.svg');

    const localFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(localFavoriteRecipes.length).toBe(1);

    setLocalStorage('favoriteRecipes', [...localFavoriteRecipes, FAVORITE_RECIPE_MOCK]);
    expect(JSON.parse(localStorage.getItem('favoriteRecipes')).length).toBe(2);

    userEvent.click(favoriteButton);
    expect(JSON.parse(localStorage.getItem('favoriteRecipes')).length).toBe(1);

    await act(async () => { renderWithRouter(<App />, { initialEntries: ['/meals/53060/in-progress'] }); });
    userEvent.click(favoriteButton);
    expect(JSON.parse(localStorage.getItem('favoriteRecipes')).length).toBe(2);
  });

  // it('Testa se componente Card renderiza recomendações', async () => {
  //   api.getRecipes.mockResolvedValue(drinks);
  //   await act(async () => { renderWithRouter(<App />, { initialEntries: ['/meals/52771/in-progress'] }); });

  //   expect(await screen.findByTestId('0-recommendation-card')).toBeInTheDocument();
  //   expect(await screen.findByTestId('1-recommendation-card')).toBeInTheDocument();
  // });
});
