import React from 'react';

export const ItemContext = React.createContext();

export const ItemStorage = ({ children }) => {
  const [items, setItems] = React.useState([]);
  const [graph, setGraph] = React.useState({});

  const handleSetChart = (items) => {
    let started = 0
    let finished = 0
    let canceled = 0
    let important = 0
    let notStarted = 0
    let total = 0

    items.forEach((item) => {
      if (item.started) {
        started += 1
      } else if (item.finished) {
        finished += 1
      } else if (item.canceled) {
        canceled += 1
      } else if (item.important) {
        important += 1
      } else if (
        !item.important &&
        !item.finished &&
        !item.started &&
        !item.canceled
      ) {
        notStarted += 1
      }
      total += 1
    });

    setGraph({total, data: [notStarted,started,important,finished,canceled]})

  }
  return (
    <ItemContext.Provider value={{ items, setItems, graph, setGraph, handleSetChart }}>
      {children}
    </ItemContext.Provider>
  );
};
