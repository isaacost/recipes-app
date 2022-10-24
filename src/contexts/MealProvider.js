import React, { useMemo, useState, useEffect } from 'react';
import { shape } from 'prop-types';
import { getMeals } from '../services/mealDBApi';
import MealContext from './MealContext';

function MealProvider({ children }) {
  const [mealsList, setMealsList] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      await getMeals();
    };

    setMealsList(fetchMeals());
  }, []);

  const value = useMemo(() => ({
    mealsList,
  }), [mealsList]);

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
