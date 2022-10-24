import React, { useMemo, useState, useEffect } from 'react';
import { shape } from 'prop-types';
import CocktailContext from './CocktailContext';
import { getCocktails } from '../services/cocktailDBApi';

function CocktailProvider({ children }) {
  const [cocktailsList, setCocktailsList] = useState([]);

  useEffect(() => {
    const fetchCocktails = async () => {
      await getCocktails();
    };

    setCocktailsList(fetchCocktails());
  }, []);

  const value = useMemo(() => ({
    cocktailsList,
  }), [cocktailsList]);

  return (
    <CocktailContext.Provider value={ value }>
      {children}
    </CocktailContext.Provider>
  );
}

CocktailProvider.propTypes = {
  children: shape({}).isRequired,
};

export default CocktailProvider;
