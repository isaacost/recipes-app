import React, { createContext, useMemo, useState } from 'react';
import { node } from 'prop-types';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const value = useMemo(() => ({
    email,
    setEmail,
    password,
    setPassword,
  }), [
    email,
    setEmail,
    password,
    setPassword,
  ]);

  return (
    <UserContext.Provider value={ value }>
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: node.isRequired,
};
