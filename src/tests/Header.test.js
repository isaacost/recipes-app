import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Testando componente Header', () => {
  it('Testando se renderiza os icones seachIcon, profileIcon e title', () => {
    renderWithRouter(<App />, '/meals');
    expect(screen.getByRole('img', { name: /profileicon/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /searchicon/i })).toBeInTheDocument();
    expect(screen.getByTestId('page-title')).toBeInTheDocument();
    expect(screen.getByTestId('page-title').innerHTML).toBe('Meals');
  });
  it('Testando se o input aparece/desaparece quando clica no botão', () => {
    renderWithRouter(<App />, '/meals');
    const button = screen.getByRole('button', { name: /searchicon/i });
    expect(screen.queryByRole('textbox')).toBe(null);
    userEvent.click(button);
    expect(screen.getByRole('textbox')).toBeVisible();
  });
});
