import React, { useEffect, useState, useContext } from 'react';
import { string } from 'prop-types';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Drinks from './Drinks';
import Meals from './Meals';
import { getRecipes, getRecipesCategories } from '../services/recipesAPI';
import { RecipesContext } from '../contexts/RecipesContext';

export default function Recipes({ title }) {
  const [categoriesList, setCategoriesList] = useState([]);
  const history = useHistory();
  const { fetchRecipesByCategory, setFilteredRecipesList } = useContext(RecipesContext);
  const { pathname } = history.location;
  const categoryType = pathname.replace('/', '');

  useEffect(() => {
    const fetch = async () => {
      setCategoriesList(await getRecipesCategories(categoryType));
    };
    fetch();
  }, [categoryType]);

  const resetRecipes = async () => {
    const newFilteredRecipesList = await getRecipes(categoryType);
    setFilteredRecipesList(newFilteredRecipesList);
  };

  return (
    <>
      <Header title={ title } />

      <main>
        <div>
          {categoriesList.map(({ strCategory }) => (
            <button
              key={ strCategory }
              data-testid={ `${strCategory}-category-filter` }
              type="button"
              onClick={ () => fetchRecipesByCategory(strCategory, categoryType) }
            >
              {strCategory}
            </button>
          ))}

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
