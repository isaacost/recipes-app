import React, { useContext, useEffect } from 'react';
import FilterButtons from '../components/FilterButtons';
import Header from '../components/Header';
import SimpleCard from '../components/SimpleCard';
import { RecipesContext } from '../contexts/RecipesContext';

export default function FavoriteRecipes() {
  const { filterType, favoriteRecipes, setFavoriteRecipes } = useContext(RecipesContext);

  useEffect(() => {
    setFavoriteRecipes(JSON.parse(localStorage.getItem('favoriteRecipes')));
  }, [setFavoriteRecipes]);

  return (
    <div>
      <Header title="Favorite Recipes" />
      <FilterButtons />

      <div className="grid gap-4">
        { favoriteRecipes?.filter((recipe) => recipe.type.includes(filterType))
          .map((recipe, index) => (
            <SimpleCard key={ recipe.id } recipe={ recipe } index={ index } />
          ))}
      </div>
    </div>
  );
}
