import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Profile() {
  const history = useHistory();
  const email = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header title="Profile" />
      <div>
        <p data-testid="profile-email">
          {email?.email || 'Sem usuário'}
        </p>
      </div>
      <div>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>

        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>

        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ handleLogout }
        >
          Logout
        </button>
      </div>
      <Footer />
    </div>
  );
}
