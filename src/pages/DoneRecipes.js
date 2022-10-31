import React from 'react';
import Header from '../components/Header';
import DoneRecipesCard from '../components/CardDoneRecipes';

export default function DoneRecipes() {
  return (
    <div>
      <Header title="Done Recipes" />
      <DoneRecipesCard />
    </div>
  );
}
