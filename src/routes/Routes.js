import React from 'react';
import { Route } from 'react-router-dom';

import Login from '../pages/Login';
import Meals from '../pages/Meals';
import Drinks from '../pages/Drinks';
import MealsIdReceita from '../pages/MealsIdReceita';
import DrinksIdReceita from '../pages/DrinksIdReceita';
import MealsInProgress from '../pages/MealsInProgress';
import DrinksInProgress from '../pages/DrinksInProgress';
import Profile from '../pages/Profile';
import DoneRecipes from '../pages/DoneRecipes';
import FavoriteRecipes from '../pages/FavoriteRecipes';

export default function Routes() {
  return (
    <>
      <Route exact path="/" component={ Login } />
      <Route exact path="/meals" component={ Meals } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/meals/:id-da-receita" component={ MealsIdReceita } />
      <Route exact path="/drinks/:id-da-receita" component={ DrinksIdReceita } />
      <Route
        exact
        path="/meals/:id-da-receita/in-progress"
        component={ MealsInProgress }
      />
      <Route
        exact
        path="/drinks/:id-da-receita/in-progress"
        component={ DrinksInProgress }
      />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
    </>
  );
}
