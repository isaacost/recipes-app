import useEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

const emailInput = 'email-input';
const passwordInput = 'password-input';
const buttonInput = 'login-submit-btn';

describe('Testando a página de Login', () => {
  it('Verifica se os inputs estão renderizados', () => {
    renderWithRouter(<App />, <App />, '/');
    const email = screen.getByTestId(emailInput);
    expect(email).toBeInTheDocument();
    const password = screen.getByTestId(passwordInput);
    expect(password).toBeInTheDocument();
    const button = screen.getByTestId(buttonInput);
    expect(button).toBeInTheDocument();
  });

  it('Verifica se o botão Enter é habilitado', () => {
    renderWithRouter(<App />, '/');
    const email = screen.getByTestId(emailInput);
    const password = screen.getByTestId(passwordInput);
    const button = screen.getByTestId(buttonInput);

    useEvent.type(email, 'alguem@alguem.com');
    useEvent.type(password, '1234567');
    expect(button).toBeEnabled();
  });

  it('Verifica se ao clicar no botão a rota está correta', () => {
    const { history } = renderWithRouter(<App />, '/');
    const email = screen.getByTestId(emailInput);
    const password = screen.getByTestId(passwordInput);
    const button = screen.getByTestId(buttonInput);

    useEvent.type(email, 'alguem@alguem.com');
    useEvent.type(password, '1234567');
    useEvent.click(button);
    const { pathname } = history.location;
    expect(pathname).toBe('/meals');
  });
});
