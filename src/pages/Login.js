import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

function Login() {
  const {
    email,
    setEmail,
    password,
    setPassword,
  } = useContext(UserContext);
  const history = useHistory();

  const regex = /\S+[@]\w+[.]\w+/gm;
  const minLength = 6;
  const isEnable = (regex.test(email) && password.length > minLength);

  const handleSendLogin = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
  };

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
          onChange={ (event) => setEmail(event.target.value) }
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
          onChange={ (event) => setPassword(event.target.value) }

        />
      </label>

      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ !isEnable }
        onClick={ handleSendLogin }
      >
        Enter
      </button>
    </fieldset>
  );
}

export default Login;
