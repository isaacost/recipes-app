import React, { useEffect, useState, useContext } from 'react';
import { string } from 'prop-types';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Drinks from './Drinks';
import Meals from './Meals';
import { getRecipes, getRecipesCategories } from '../services/recipesAPI';
import { RecipesContext } from '../contexts/RecipesContext';

const MAX_CATEGORIES_LENGTH = 5;

export default function Recipes({ title }) {
  const [categoriesList, setCategoriesList] = useState([]);
  const history = useHistory();
  const { fetchRecipesByCategory, setFilteredRecipesList } = useContext(RecipesContext);
  const { pathname } = history.location;
  const recipeType = pathname.replace('/', '');

  useEffect(() => {
    const fetch = async () => {
      const newCategoriesList = await getRecipesCategories(recipeType);
      setCategoriesList(newCategoriesList[recipeType]);
    };
    fetch();
  }, [recipeType]);

  useEffect(() => {
    const fetch = async () => {
      const newFilteredRecipesList = await getRecipes(recipeType);
      setFilteredRecipesList(newFilteredRecipesList[recipeType]);
    };
    fetch();
  }, [history, recipeType, setFilteredRecipesList]);

  const resetRecipes = async () => {
    const newFilteredRecipesList = await getRecipes(recipeType);
    setFilteredRecipesList(newFilteredRecipesList[recipeType]);
  };

  return (
    <>
      <Header title={ title } />

      <main>
        <div>
          {
            categoriesList
              .filter((_, index) => index < MAX_CATEGORIES_LENGTH)
              .map(({ strCategory }) => (
                <button
                  key={ strCategory }
                  data-testid={ `${strCategory}-category-filter` }
                  type="button"
                  onClick={ () => fetchRecipesByCategory(strCategory, recipeType) }
                >
                  {strCategory}
                </button>
              ))
          }

          <button
            type="button"
            data-testid="All-category-filter"
            onClick={ resetRecipes }
          >
            All
          </button>
        </div>

        {title === 'Meals' ? <Meals /> : <Drinks />}
      </main>

      <Footer />

    </>
  );
}

Recipes.propTypes = {
  title: string.isRequired,
};
