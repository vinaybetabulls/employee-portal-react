import React, { useState, createContext } from "react";

// Create Context Object
export const AppContext = createContext();

// Create a provider for components to consume and subscribe to changes
export const AppProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('empJWT') || false);

  let values = { isAuthenticated, setIsAuthenticated }
  return (
    <AppContext.Provider value={values}>
      {props.children}
    </AppContext.Provider>
  );
};

