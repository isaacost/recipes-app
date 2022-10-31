/* eslint-disable react-hooks/exhaustive-deps */
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
  const history = useHistory();
  const [filteredRecipesList, setFilteredRecipesList] = useState([]);
  const [searchFor, setSearchFor] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [selectedItem, setSelectedItem] = useState({});
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [inProgressRecipes, setInProgressRecipes] = useState({ drinks: {}, meals: {} });
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [recipeDetails, setRecipeDetails] = useState({});
  const [usedIngredients, setUsedIngredients] = useState([]);

  const { pathname } = history.location;
  const recipeId = pathname.split('/')[2];
  const recipeType = history.location.pathname.split('/')[1];
  const type = recipeType === 'meals' ? 'Meal' : 'Drink';

  const ingredientsList = Object
    .entries(recipeDetails)
    .filter((item) => item[0].includes('strIngredient') && item[1])
    .map((item) => item[1]);

  const measureList = Object
    .entries(recipeDetails)
    .filter((item) => item[0].includes('strMeasure') && item[1] !== ' ')
    .map((item) => item[1]);

  const getRecipeType = () => history.location.pathname.split('/')[1];

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

    const localFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!localFavoriteRecipes) {
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    } else {
      setFavoriteRecipes(localFavoriteRecipes);
    }
  }, []);

  const checkIfRecipeIsUnique = useCallback((newFilteredRecipesList) => {
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
    if (searchFor === 'ingredients') {
      const newFilteredRecipesList = await getRecipesByIngredient(
        searchInput,
        recipeType,
      );
      setFilteredRecipesList(newFilteredRecipesList[recipeType] || []);

      if (!newFilteredRecipesList) {
        global.alert(ERROR_MESSAGE);
      }
    }

    if (searchFor === 'name') {
      const newFilteredRecipesList = await getRecipesByName(
        searchInput,
        recipeType,
      );

      if (!newFilteredRecipesList[recipeType]) return global.alert(ERROR_MESSAGE);
      checkIfRecipeIsUnique(newFilteredRecipesList[recipeType] || []);
      setFilteredRecipesList(newFilteredRecipesList[recipeType] || []);
    }

    if (searchFor === 'firstLetter') {
      const newFilteredRecipesList = await getRecipesByFirstLetter(
        searchInput,
        recipeType,
      );

      if (!newFilteredRecipesList) return global.alert(ERROR_MESSAGE);
      setFilteredRecipesList(newFilteredRecipesList[recipeType] || []);
    }
  }, [searchFor, searchInput, history, checkIfRecipeIsUnique]);

  const fetchRecipesByCategory = useMemo(() => async (categoryName, categoryType) => {
    const newFilteredRecipesList = await getRecipesByCategory(categoryName, categoryType);

    if (newFilteredRecipesList[recipeType]?.every(
      (recipe, index) => {
        const strRecipe = categoryType === 'meals' ? 'strMeal' : 'strDrink';
        return recipe[strRecipe] === filteredRecipesList[index][strRecipe];
      },
    )) {
      console.log('called');
      const newRecipes = await getRecipes(categoryType);
      setFilteredRecipesList(newRecipes[recipeType]);
    } else {
      setFilteredRecipesList(newFilteredRecipesList[recipeType]);
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
    favoriteRecipes,
    setFavoriteRecipes,
    recipeDetails,
    setRecipeDetails,
    type,
    recipeType,
    recipeId,
    ingredientsList,
    measureList,
    usedIngredients,
    setUsedIngredients,
    getRecipeType,
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
    favoriteRecipes,
    setFavoriteRecipes,
    recipeDetails,
    setRecipeDetails,
    type,
    recipeType,
    recipeId,
    ingredientsList,
    measureList,
    usedIngredients,
    setUsedIngredients,
    getRecipeType,
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
