import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import logo from '../images/logo.png';

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

  const inputStyle = `border border-purple-600 rounded 
  w-full p-2 placeholder:text-purple-600`;

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-purple-900">
      <div>
        <img src={ logo } alt="logo recipes app" />
      </div>

      <h1 className="uppercase italic text-2xl text-purple-200 mb-4">Login</h1>

      <fieldset className="flex flex-col gap-2 w-60">
        <label htmlFor="email-input" className="w-full">
          <span className="hidden">Email:</span>
          <input
            type="text"
            data-testid="email-input"
            name="email-input"
            id="email-input"
            value={ email }
            onChange={ (event) => setEmail(event.target.value) }
            className={ inputStyle }
            placeholder="Email"
          />
        </label>

        <label htmlFor="password-input" className="w-full">
          <span className="hidden">Senha:</span>
          <input
            type="password"
            data-testid="password-input"
            name="password-input"
            id="password-input"
            value={ password }
            onChange={ (event) => setPassword(event.target.value) }
            className={ inputStyle }
            placeholder="Senha"
          />
        </label>

        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ !isEnable }
          onClick={ handleSendLogin }
          className={ `bg-amber-400 text-white font-bold 
          p-2 w-full rounded disabled:bg-slate-400 hover:bg-amber-300` }
        >
          Enter
        </button>
      </fieldset>
    </div>
  );
}

export default Login;
