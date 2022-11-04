import React from 'react';
import { RecipesProvider } from './contexts/RecipesContext';
import { UserProvider } from './contexts/UserContext';
import Routes from './routes/Routes';

function App() {
  return (
    <RecipesProvider>
      <UserProvider>
        <div
          className={ `bg-white sm:max-w-md mx-auto border-white border-8
        rounded-xl min-h-screen my-4` }
        >
          <Routes />
        </div>
      </UserProvider>
    </RecipesProvider>
  );
}

export default App;
