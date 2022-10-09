import React from 'react';
import './Header.scss';

export const Header = () => {
  return (
    <header className="header">
      <>
        <h1>Weekly Planner</h1>
        <h4 id="username">Hello, </h4>
        <p id="date">Hoje é dia 10, segunda. outubro 2022</p>
      </>

      <i id="home" className="pi pi-home"></i>

      <div id="actions"></div>
    </header>
  );
};
