import React, { useMemo, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { node } from 'prop-types';
import {
  getMealsByFirstLetter,
  getMealsByIngredient,
  getMealsByName,
} from '../services/mealDBApi';
import MealContext from './MealContext';
import {
  getDrinksByFirstLetter,
  getDrinksByIngredient,
  getDrinksByName,
} from '../services/cocktailDBApi';

function MealProvider({ children }) {
  // const [mealsList, setMealsList] = useState([]);
  const [filteredFoodList, setFilteredFoodList] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [searchFor, setSearchFor] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const history = useHistory();

  // useEffect(() => {
  //   const fetchMeals = async () => {
  //     await getMeals();
  //   };

  //   setMealsList(fetchMeals());
  // }, []);

  const handleEmail = ({ target: { value } }) => {
    setEmail(value);
  };

  const handlePassword = ({ target: { value } }) => {
    setPassword(value);
  };

  const handleSendLogin = useCallback(() => {
    localStorage.setItem('user', JSON.stringify({ email }));

    history.push('/meals');
  }, [email, history]);

  const searchMeals = useCallback(async () => {
    const { pathname } = history.location;

    if (searchFor === 'ingredients') {
      if (pathname === '/meals') {
        setFilteredFoodList(await getMealsByIngredient(searchInput));
      } else {
        setFilteredFoodList(await getDrinksByIngredient(searchInput));
      }
    }
    if (searchFor === 'name') {
      if (pathname === '/meals') {
        setFilteredFoodList(await getMealsByName(searchInput));
      } else {
        setFilteredFoodList(await getDrinksByName(searchInput));
      }
    }
    if (searchFor === 'firstLetter') {
      if (pathname === '/meals') {
        setFilteredFoodList(await getMealsByFirstLetter(searchInput));
      } else {
        setFilteredFoodList(await getDrinksByFirstLetter(searchInput));
      }
    }
  }, [searchFor, searchInput, history]);

  const value = useMemo(() => ({
    email,
    password,
    // mealsList,
    handleEmail,
    handlePassword,
    handleSendLogin,
    searchFor,
    setSearchFor,
    searchMeals,
    searchInput,
    setSearchInput,
    filteredFoodList,
  }), [
    email,
    password,
    // mealsList,
    handleSendLogin,
    searchFor,
    setSearchFor,
    searchMeals,
    searchInput,
    setSearchInput,
    filteredFoodList,
  ]);

  return (
    <MealContext.Provider value={ value }>
      {children}
    </MealContext.Provider>
  );
}

MealProvider.propTypes = {
  children: node.isRequired,
};

export default MealProvider;
