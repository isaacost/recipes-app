import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

const setLocalStorage = (id, data) => {
  window.localStorage.setItem(id, JSON.stringify(data));
};

setLocalStorage('user', { email: 'alguem@alguem.com' });

describe('Testando componente Profile', () => {
  it('Verifica se redireciona os botões e o email na página', () => {
    renderWithRouter(<App />, { initialEntries: ['/profile'] });

    const email = screen.getByTestId('profile-email');
    expect(email).toBeInTheDocument();

    const bottomDone = screen.getByTestId('profile-done-btn');
    expect(bottomDone).toBeInTheDocument();

    const bottomFavorite = screen.getByTestId('profile-favorite-btn');
    expect(bottomFavorite).toBeInTheDocument();

    const bottomLogout = screen.getByTestId('profile-logout-btn');
    expect(bottomLogout).toBeInTheDocument();
  });
  it('Verifica se o botão Done Recipes redireciona para rota correta', () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/profile'] });

    const bottomDone = screen.getByTestId('profile-done-btn');

    userEvent.click(bottomDone);
    const { pathname } = history.location;
    expect(pathname).toBe('/done-recipes');
  });
  it('Verifica se o botão Favorite Recipes redireciona para rota correta', () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/profile'] });

    const bottomFavorite = screen.getByTestId('profile-favorite-btn');

    userEvent.click(bottomFavorite);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorite-recipes');
  });
  it('Verifica se o botão Logout redireciona para rota correta', () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/profile'] });

    const bottomLogout = screen.getByTestId('profile-logout-btn');

    userEvent.click(bottomLogout);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
});
