import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';

import MenuIcon from '@mui/icons-material/Menu';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import BarChartIcon from '@mui/icons-material/BarChart';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import PaletteIcon from '@mui/icons-material/Palette';
import LogoutIcon from '@mui/icons-material/Logout';

import { removeLocalStorage } from '../../helpers/LocalStorage';

import { logout, userId } from '../../services/api';

export default function PlannerActions() {
  const navigate = useNavigate();

  const actions = [
    {
      icon: <ManageAccountsIcon />,
      name: 'Account',
    },
    {
      icon: <BarChartIcon />,
      name: 'Statistics',
    },
    { icon: <RestartAltIcon />, name: 'Reset' },
    { icon: <PaletteIcon />, name: 'Theme' },
    { icon: <LogoutIcon />, name: 'Logout' },
  ];

  function actionPlanner(type) {
    switch (type) {
      case 'Account':
        navigate('/account');
        break;

      case 'Statistics':
        return console.log('chart');
        break;

      case 'Reset':
        return console.log('reset');
        break;

      case 'Theme':
        return console.log('theme');
        break;

      default:
        logout(userId).then(() => {
          removeLocalStorage('auth');
          removeLocalStorage('userId');
          navigate('/auth');
        });
        break;
    }
  }

  return (
    <Box sx={{ transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', top: 10, right: 10 }}
        icon={<MenuIcon />}
        direction="down"
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={(e) => {
              e.preventDefault();
              actionPlanner(action.name);
            }}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
