import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import renderWithRouter from './helpers/renderWithRouter';
// import App from '../App';
import * as api from '../services/recipesAPI';
import oneDrink from '../../cypress/mocks/oneDrink';

describe.skip('Testando APIs', () => {
  it('Testando getRecipeDetails', () => {
    global.fetch = jest.fn(async () => Promise.resolve({
      json: async () => Promise.resolve(oneDrink),
    }));

    api.getRecipeDetails();
    expect(api.getRecipeDetails).toHaveBeenCalled();
  });
});
