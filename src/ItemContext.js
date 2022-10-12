import React from 'react';

export const ItemContext = React.createContext();

export const ItemStorage = ({ children }) => {
  const [items, setItems] = React.useState([]);

  return (
    <ItemContext.Provider value={{ items, setItems }}>
      {children}
    </ItemContext.Provider>
  );
};
