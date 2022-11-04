import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import logoutIcon from '../images/logout-icon.png';
import doneRecipesIcon from '../images/done-recipe-icon.png';
import blackHeartIcon from '../images/black-heart.png';

export default function Profile() {
  const history = useHistory();
  const email = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div className="text-center">
      <Header title="Profile" />

      <div className="font-bold my-10">
        <p data-testid="profile-email">
          {email?.email || 'Sem usuário'}
        </p>
      </div>

      <div className="flex flex-col gap-4 w-64 mx-auto">
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
          className="flex items-center gap-4 border-b pb-4"
        >
          <img src={ doneRecipesIcon } alt="ícone de receitas finalizadas" />
          <p className="text-slate-600">Done Recipes</p>
        </button>

        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
          className="flex items-center gap-4 border-b pb-4"
        >
          <img src={ blackHeartIcon } alt="ícone de favoritar" />
          <p className="text-slate-600">Favorite Recipes</p>
        </button>

        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ handleLogout }
          className="flex items-center gap-4"
        >
          <img src={ logoutIcon } alt="ícone de logout" />
          <p className="text-slate-600">Logout</p>
        </button>
      </div>
      <Footer />
    </div>
  );
}
