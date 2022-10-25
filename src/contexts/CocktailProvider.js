import React, { useMemo } from 'react';
import { node } from 'prop-types';
import CocktailContext from './CocktailContext';

function CocktailProvider({ children }) {
  // const [cocktailsList, setCocktailsList] = useState([]);

  // useEffect(() => {
  //   const fetchCocktails = async () => {
  //     await getCocktails();
  //   };

  //   setCocktailsList(fetchCocktails());
  // }, []);

  const value = useMemo(() => ({
    // cocktailsList,
  }), []);

  return (
    <CocktailContext.Provider value={ value }>
      {children}
    </CocktailContext.Provider>
  );
}

CocktailProvider.propTypes = {
  children: node.isRequired,
};

export default CocktailProvider;
