import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Header.scss';
import { IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PlannerActions from '../PlannerActions/PlannerActions';
import { getLocalStorage } from '../../helpers/LocalStorage';
import { Today } from '../../helpers/Today';

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const todayIs = Today();

  return (
    <>
      {' '}
      {(location.pathname === '/' ||
        location.pathname === '/auth' ||
        location.pathname === '/account') && (
        <header className="header">
          {location.pathname !== '/auth' && (
            <>
              <PlannerActions />
            </>
          )}
          {(location.pathname === '/' || location.pathname === '/auth') && (
            <>
              <h1>Weekly Planner</h1>{' '}
              {location.pathname === '/' && (
                <h5 id="username">
                  Hello, {getLocalStorage('auth')?.user.name.split(' ')[0]}{' '}
                </h5>
              )}
            </>
          )}
          {location.pathname === '/' && <p id="date">{todayIs}</p>}

          {location.pathname === '/account' && (
            <div id="home">
              {' '}
              <IconButton
                className="button-home"
                onClick={() => navigate('/')}
                aria-label="delete"
              >
                <HomeIcon />
              </IconButton>{' '}
            </div>
          )}
        </header>
      )}{' '}
    </>
  );
};
