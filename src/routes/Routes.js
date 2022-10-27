import React from 'react';
import { Route } from 'react-router-dom';

import Login from '../pages/Login';
import MealsInProgress from '../pages/MealsInProgress';
import DrinksInProgress from '../pages/DrinksIsProgress';
import Profile from '../pages/Profile';
import DoneRecipes from '../pages/DoneRecipes';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import Recipes from '../pages/Recipes';
import RecipeDetails from '../pages/RecipeDetails';

export default function Routes() {
  return (
    <>
      <Route exact path="/" component={ Login } />
      <Route exact path="/meals" render={ () => <Recipes title="Meals" /> } />
      <Route exact path="/drinks" render={ () => <Recipes title="Drinks" /> } />

      <Route exact path="/meals/:id" render={ () => <RecipeDetails /> } />
      <Route exact path="/drinks/:id" render={ () => <RecipeDetails /> } />

      <Route
        exact
        path="/meals/:id/in-progress"
        component={ MealsInProgress }
      />
      <Route
        exact
        path="/drinks/:id/in-progress"
        component={ DrinksInProgress }
      />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
    </>
  );
}
