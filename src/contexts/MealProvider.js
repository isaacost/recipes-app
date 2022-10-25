import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { shape } from 'prop-types';
import { getMeals } from '../services/mealDBApi';
import MealContext from './MealContext';

function MealProvider({ children }) {
  const [mealsList, setMealsList] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

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

  useEffect(() => {
    const fetchMeals = async () => {
      await getMeals();
    };

    setMealsList(fetchMeals());
  }, []);

  const value = useMemo(() => ({
    email,
    password,
    mealsList,
    handleEmail,
    handlePassword,
    handleSendLogin,
  }), [email, password, mealsList, handleSendLogin]);

  return (
    <MealContext.Provider value={ value }>
      {children}
    </MealContext.Provider>
  );
}

MealProvider.propTypes = {
  children: shape({}).isRequired,
};

export default MealProvider;
