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

export const RecipesContext = createContext();

const ERROR_MESSAGE = 'Sorry, we haven\'t found any recipes for these filters.';

export function RecipesProvider({ children }) {
  const [filteredRecipesList, setFilteredRecipesList] = useState([]);
  const [searchFor, setSearchFor] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [selectedItem, setSelectedItem] = useState({});
  const history = useHistory();

  useEffect(() => {
    const fetch = async () => {
      const { pathname } = history.location;
      const recipeType = pathname.replace('/', '');
      setFilteredRecipesList(await getRecipes(recipeType));
    };
    fetch();
  }, [history]);

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

  const fetchRecipesByCategory = async (categoryName, categoryType) => {
    setFilteredRecipesList(await getRecipesByCategory(categoryName, categoryType));
  };

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
  }), [
    searchFor,
    setSearchFor,
    searchMeals,
    searchInput,
    setSearchInput,
    filteredRecipesList,
    setFilteredRecipesList,
    selectedItem,
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
