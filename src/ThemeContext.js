import React from 'react';
import { getTheme, defaultTheme } from './helpers/Theme';

export const ThemeContext = React.createContext();

export const ThemeStorage = ({ children }) => {
  const [theme, setTheme] = React.useState(getTheme() || defaultTheme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
