import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Header.scss';
import { IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PlannerActions from '../PlannerActions/PlannerActions';

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();


  return (
    <>
      {' '}
      {(location.pathname === '/' ||
        location.pathname === '/auth' ||
        location.pathname === '/account') && (
        <header className="header">
          {location.pathname !== '/auth' && (
            <>
              {' '}
              <PlannerActions />
            </>
          )}
          {(location.pathname === '/' || location.pathname === '/auth') && (
            <>
              {' '}
              <h1>Weekly Planner</h1> <h4 id="username">Hello, </h4>{' '}
            </>
          )}
          {location.pathname === '/' && (
            <p id="date">Hoje é dia 10, segunda. outubro 2022</p>
          )}

          {location.pathname === '/account' && (
            <IconButton onClick={() => navigate('/')} aria-label="delete">
              <HomeIcon />
            </IconButton>
          )}
        </header>
      )}{' '}
    </>
  );
};
