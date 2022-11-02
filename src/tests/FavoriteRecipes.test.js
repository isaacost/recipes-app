import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

jest.mock('clipboard-copy', () => jest.fn());

const copy = require('clipboard-copy');

const FAVORITE_RECIPES_ROUTE = '/favorite-recipes';

const LOCAL_FAVORITES_MOCK = [
  {
    id: '52977',
    type: 'meal',
    nationality: 'Turkish',
    category: 'Side',
    alcoholicOrNot: '',
    name: 'Corba',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  },
  {
    id: '15997',
    type: 'drink',
    nationality: '',
    category: 'Ordinary Drink',
    alcoholicOrNot: 'Optional alcohol',
    name: 'GG',
    image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
  },
];

describe('Testando componente FavoriteRecipes', () => {
  it('Testa botões de filtro', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(LOCAL_FAVORITES_MOCK));
    await act(async () => { renderWithRouter(<App />, FAVORITE_RECIPES_ROUTE); });

    const filterAllButton = screen.getByTestId('filter-by-all-btn');
    const filterMealButton = screen.getByTestId('filter-by-meal-btn');
    const filterDrinkButton = screen.getByTestId('filter-by-drink-btn');

    expect(filterAllButton).toBeInTheDocument();
    expect(filterMealButton).toBeInTheDocument();
    expect(filterDrinkButton).toBeInTheDocument();

    expect(screen.getAllByRole('img', { name: /imagem da receita/i }).length).toBe(2);
    userEvent.click(filterMealButton);
    expect(screen.getAllByRole('img', { name: /imagem da receita/i }).length).toBe(1);
    userEvent.click(filterDrinkButton);
    expect(screen.getAllByRole('img', { name: /imagem da receita/i }).length).toBe(1);
    userEvent.click(filterAllButton);
    expect(screen.getAllByRole('img', { name: /imagem da receita/i }).length).toBe(2);
  });

  it('Testa botão de compartilhar', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(LOCAL_FAVORITES_MOCK));
    await act(async () => { renderWithRouter(<App />, FAVORITE_RECIPES_ROUTE); });

    copy.mockImplementation(() => null);

    const shareButtons = screen.getAllByRole('button', { name: /ícone de compartilhar/i });

    expect(shareButtons[0]).toBeInTheDocument();
    userEvent.click(shareButtons[0]);

    expect(copy).toHaveBeenCalled();
    const copiedLinkElement = screen.getByText('Link copied!');
    expect(copiedLinkElement).toBeInTheDocument();
    setTimeout(() => expect(copiedLinkElement).not.toBeInTheDocument(), 1000);
  });

  it('Testa botão de favoritar', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(LOCAL_FAVORITES_MOCK));
    await act(async () => { renderWithRouter(<App />, FAVORITE_RECIPES_ROUTE); });

    const favoriteButton = screen.getByTestId('0-horizontal-favorite-btn');
    expect(favoriteButton).toBeInTheDocument();
    userEvent.click(favoriteButton);
    expect(JSON.parse(localStorage.getItem('favoriteRecipes')).length).toBe(1);
  });
});
