import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import BarChartIcon from '@mui/icons-material/BarChart';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import PaletteIcon from '@mui/icons-material/Palette';
import LogoutIcon from '@mui/icons-material/Logout';

import { removeLocalStorage } from '../../helpers/LocalStorage';
import { logout, userId } from '../../services/api';
import { ThemeDialog } from '../Dialogs/ThemeDialog';
import { ResetDialog } from '../Dialogs/ResetDialog';
import { ChartDialog } from '../Dialogs/ChartDialog';

export default function PlannerActions() {
  const navigate = useNavigate();
  const [openTheme, setOpenTheme] = React.useState(false);
  const [openReset, setOpenReset] = React.useState(false);
  const [openChart, setOpenChart] = React.useState(false);

  const handleClickOpenThemeDialog = () => {
    setOpenTheme(true);
  };

  const handleCloseThemeDialog = () => {
    setOpenTheme(false);
  };

  const handleClickOpenResetDialog = () => {
    setOpenReset(true);
  };

  const handleCloseResetDialog = () => {
    setOpenReset(false);
  };

  const handleClickOpenChartDialog = () => {
    setOpenChart(true);
  };

  const handleCloseChartDialog = () => {
    setOpenChart(false);
  };

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
      case 'Statistics':
        handleClickOpenChartDialog();
        break;
      case 'Theme':
        handleClickOpenThemeDialog();
        break;
      case 'Account':
        navigate('/account');
        break;
      case 'Reset':
        handleClickOpenResetDialog();
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
    <Box  sx={{ transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial"
        sx={{ position: 'absolute', top: 10, right: 10 }}
        icon={<SpeedDialIcon icon={<MenuIcon />} openIcon={<CloseIcon />} />}
        direction="down"
      >
        {actions.map((action) => (
          <SpeedDialAction
            className="btn-action"
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
      <ThemeDialog open={openTheme} onClose={handleCloseThemeDialog} />
      <ResetDialog open={openReset} onClose={handleCloseResetDialog} />
      <ChartDialog open={openChart} onClose={handleCloseChartDialog} />
    </Box>
  );
}
