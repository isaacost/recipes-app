import React, { createContext, useMemo, useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { node } from 'prop-types';

import {
  getRecipes,
  getRecipesByCategory,
  getRecipesByFirstLetter,
  getRecipesByIngredient,
  getRecipesByName,
} from '../services/recipesAPI';

// const TEST_DONE_RECIPE = [{
//   id: '15997',
//   type: 'drink',
//   nationality: '',
//   category: 'Ordinary Drink',
//   alcoholicOrNot: 'Optional alcohol',
//   name: 'GG',
//   image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
//   doneDate: '11/11/11',
//   tags: [],
// }];

// const TEST_IN_PROGRESS_RECIPE = {
//   drinks: {
//     17222: [''],
//   },
//   meals: {
//     1: [],
//   },
// };

export const RecipesContext = createContext();

const ERROR_MESSAGE = 'Sorry, we haven\'t found any recipes for these filters.';

export function RecipesProvider({ children }) {
  const [filteredRecipesList, setFilteredRecipesList] = useState([]);
  const [searchFor, setSearchFor] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [selectedItem, setSelectedItem] = useState({});
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [inProgressRecipes, setInProgressRecipes] = useState({ drinks: {}, meals: {} });

  const history = useHistory();

  useEffect(() => {
    const localDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (!localDoneRecipes) {
      localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    } else {
      setDoneRecipes(localDoneRecipes);
    }

    const localInProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!localInProgressRecipes) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    } else {
      setInProgressRecipes(localInProgressRecipes);
    }
  }, []);

  const checkIfRecipeIsUnique = useCallback((newFilteredRecipesList) => {
    const { pathname } = history.location;

    if (newFilteredRecipesList.length === 1 && pathname === '/meals') {
      history.push(`${pathname}/${newFilteredRecipesList[0].idMeal}`);
      setSelectedItem(newFilteredRecipesList[0]);
    }

    if (newFilteredRecipesList.length === 1 && pathname === '/drinks') {
      history.push(`${pathname}/${newFilteredRecipesList[0].idDrink}`);
      setSelectedItem(newFilteredRecipesList[0]);
    }
  }, [history]);

  const searchMeals = useCallback(async () => {
    const { pathname } = history.location;
    const recipeType = pathname.replace('/', '');

    if (searchFor === 'ingredients') {
      const newFilteredRecipesList = await getRecipesByIngredient(
        searchInput,
        recipeType,
      );
      setFilteredRecipesList(newFilteredRecipesList || []);

      if (!newFilteredRecipesList) {
        global.alert(ERROR_MESSAGE);
      }
    }

    if (searchFor === 'name') {
      const newFilteredRecipesList = await getRecipesByName(
        searchInput,
        recipeType,
      );

      checkIfRecipeIsUnique(newFilteredRecipesList || []);
      setFilteredRecipesList(newFilteredRecipesList || []);

      if (!newFilteredRecipesList) {
        global.alert(ERROR_MESSAGE);
      }
    }

    if (searchFor === 'firstLetter') {
      const newFilteredRecipesList = await getRecipesByFirstLetter(
        searchInput,
        recipeType,
      );
      setFilteredRecipesList(newFilteredRecipesList || []);

      if (!newFilteredRecipesList) {
        global.alert(ERROR_MESSAGE);
      }
    }
  }, [searchFor, searchInput, history, checkIfRecipeIsUnique]);

  const fetchRecipesByCategory = useMemo(() => async (categoryName, categoryType) => {
    const newFilteredRecipesList = await getRecipesByCategory(categoryName, categoryType);

    if (newFilteredRecipesList.every(
      (recipe, index) => {
        const strRecipe = categoryType === 'meals' ? 'strMeal' : 'strDrink';
        return recipe[strRecipe] === filteredRecipesList[index][strRecipe];
      },
    )) {
      setFilteredRecipesList(await getRecipes(categoryType));
    } else {
      setFilteredRecipesList(newFilteredRecipesList);
    }
  }, [filteredRecipesList]);

  const value = useMemo(() => ({
    searchFor,
    setSearchFor,
    searchMeals,
    searchInput,
    setSearchInput,
    filteredRecipesList,
    setFilteredRecipesList,
    selectedItem,
    fetchRecipesByCategory,
    doneRecipes,
    inProgressRecipes,
  }), [
    searchFor,
    setSearchFor,
    searchMeals,
    searchInput,
    setSearchInput,
    filteredRecipesList,
    setFilteredRecipesList,
    selectedItem,
    fetchRecipesByCategory,
    doneRecipes,
    inProgressRecipes,
  ]);

  return (
    <RecipesContext.Provider value={ value }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: node.isRequired,
};
