import React, { useContext } from 'react';
import MealContext from '../contexts/MealContext';

function Login() {
  const { email, handleEmail, password,
    handlePassword, handleSendLogin } = useContext(MealContext);
  const regex = /\S+[@]\w+[.]\w+/gm;
  const minLength = 6;
  const habilitado = (regex.test(email) && password.length > minLength);

  return (
    <fieldset>
      <label htmlFor="email-input">
        Email:
        <input
          type="text"
          data-testid="email-input"
          name="email-input"
          id="email-input"
          value={ email }
          onChange={ handleEmail }
        />
      </label>

      <label htmlFor="password-input">
        Senha:
        <input
          type="password"
          data-testid="password-input"
          name="password-input"
          id="password-input"
          value={ password }
          onChange={ handlePassword }
        />
      </label>

      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ !habilitado }
        onClick={ handleSendLogin }
      >
        Enter
      </button>
    </fieldset>
  );
}

export default Login;
