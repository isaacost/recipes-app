import React, { createContext, useMemo, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { node } from 'prop-types';

import {
  getRecipesByFirstLetter,
  getRecipesByIngredient,
  getRecipesByName,
} from '../services/recipesAPI';

export const RecipesContext = createContext();

export function RecipesProvider({ children }) {
  // const [recipesList, setRecipesList] = useState([]);
  const [filteredRecipesList, setFilteredRecipesList] = useState([]);
  const [searchFor, setSearchFor] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [selectedItem, setSelectedItem] = useState({});
  const history = useHistory();

  const checkIfRecipeIsUnique = useCallback((newFilteredRecipesList, route) => {
    if (newFilteredRecipesList.length === 1 && route === 'meals') {
      history.push(`/${route}/${newFilteredRecipesList[0].idMeal}`);
      setSelectedItem(newFilteredRecipesList[0]);
    }

    if (newFilteredRecipesList.length === 1 && route === 'drinks') {
      history.push(`/${route}/${newFilteredRecipesList[0].idDrink}`);
      setSelectedItem(newFilteredRecipesList[0]);
    }
  }, [history]);

  const searchMeals = useCallback(async () => {
    const { pathname } = history.location;
    const recipeType = pathname.replace('/', '');

    if (searchFor === 'ingredients') {
      const newFilteredRecipesList = await
      getRecipesByIngredient(searchInput, recipeType);
      setFilteredRecipesList(newFilteredRecipesList);
    }

    if (searchFor === 'name') {
      const newFilteredRecipesList = await getRecipesByName(searchInput, recipeType);
      checkIfRecipeIsUnique(newFilteredRecipesList, recipeType);
      setFilteredRecipesList(newFilteredRecipesList);
    }

    if (searchFor === 'firstLetter') {
      const newFilteredRecipesList = await
      getRecipesByFirstLetter(searchInput, recipeType);
      setFilteredRecipesList(newFilteredRecipesList);
    }
  }, [searchFor, searchInput, history, checkIfRecipeIsUnique]);

  const value = useMemo(() => ({
    searchFor,
    setSearchFor,
    searchMeals,
    searchInput,
    setSearchInput,
    filteredRecipesList,
    selectedItem,
  }), [
    searchFor,
    setSearchFor,
    searchMeals,
    searchInput,
    setSearchInput,
    filteredRecipesList,
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
