import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MealContext from '../contexts/MealContext';

export default function Profile() {
  const { handleDoneRecipes,
    handleFavoriteRecipes,
    handleLogout } = useContext(MealContext);
  const email = JSON.parse(localStorage.getItem('user'));
  console.log(email);
  return (
    <div>
      <Header title="Profile" />
      <div>
        {
          (email === null)
            ? (<p data-testid="profile-email"> Sem usuário </p>)
            : (
              <p data-testid="profile-email">
                {Object.values(email)}
              </p>
            )
        }
      </div>
      <div>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ handleDoneRecipes }
        >
          Done Recipes
        </button>

        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ handleFavoriteRecipes }
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
