import React from 'react';
import { RecipesProvider } from './contexts/RecipesContext';
import { UserProvider } from './contexts/UserContext';
import Routes from './routes/Routes';

function App() {
  return (
    <RecipesProvider>
      <UserProvider>
        <Routes />
      </UserProvider>
    </RecipesProvider>
  );
}

export default App;
