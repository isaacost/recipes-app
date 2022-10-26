import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { RecipesContext } from '../contexts/RecipesContext';

const MAX_RECIPES_LENGTH = 12;

export default function Meals() {
  const { filteredRecipesList } = useContext(RecipesContext);

  return (
    <div>
      <Header title="Meals" />

      <main>
        {filteredRecipesList?.reduce((acc, recipe, index) => {
          if (index < MAX_RECIPES_LENGTH) acc.push(recipe);
          return acc;
        }, []).map((recipe, index) => (
          <div key={ recipe.idMeal } data-testid={ `${index}-recipe-card` }>
            <img
              src={ recipe.strMealThumb }
              alt={ recipe.strMeal }
              data-testid={ `${index}-card-img` }
            />
            <h2 data-testid={ `${index}-card-name` }>{recipe.strMeal}</h2>
          </div>
        ))}
      </main>
      <Footer />
    </div>
  );
}
