import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MealContext from '../contexts/MealContext';

export default function Profile() {
  const { handleDoneRecipes,
    handleFavoriteRecipes,
    handleLogout } = useContext(MealContext);
  const email = JSON.parse(localStorage.getItem('user'));
  // console.log(Object.values(email));
  return (
    <div>
      <Header title="Profile" />
      <p data-testid="profile-email">
        { Object.values(email) }
      </p>

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
      <Footer />
    </div>
  );
}
