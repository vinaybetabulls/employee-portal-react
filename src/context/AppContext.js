import React, { useState, createContext } from "react";
import jwtDecode from 'jwt-decode';

// Create Context Object
export const AppContext = createContext();

// Create a provider for components to consume and subscribe to changes
export const AppProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('empJWT') || false);
  const decoded = isAuthenticated && jwtDecode(localStorage.getItem('empJWT'));
  console.log(decoded);
  const [role, setRole] = useState("");
  const [permissions, setPermission] = useState([]);

  let values = { isAuthenticated, setIsAuthenticated }
  return (
    <AppContext.Provider value={values}>
      {props.children}
    </AppContext.Provider>
  );
};

