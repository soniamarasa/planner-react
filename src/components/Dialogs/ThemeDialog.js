import * as React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { setThemeStorage } from '../../helpers/Theme';
import { ThemeContext } from '../../ThemeContext';

export const ThemeDialog = (props) => {
  const { onClose, open } = props;

  const { theme, setTheme } = React.useContext(ThemeContext);

  const themes = [
    { name: 'Tema 01', value: 'theme-01' },
    { name: 'Tema 02', value: 'theme-02' },
    { name: 'Tema 03', value: 'theme-03' },
    { name: 'Tema 04', value: 'theme-04' },
    { name: 'Tema 05', value: 'theme-05' },
    { name: 'Tema 06', value: 'theme-06' },
  ];

  const handleChange = (event) => {
    setThemeStorage(event.target.value);
    setTheme(event.target.value);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog className={theme} onClose={handleClose} open={open}>
      <DialogTitle>Choose a theme</DialogTitle>

      <DialogContent>
        <FormControl fullWidth>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={theme}
            label="Theme"
            onChange={handleChange}
          >
            {themes.map((theme) => (
              <MenuItem key={theme.value} value={theme.value}>
                {theme.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
    </Dialog>
  );
};

ThemeDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
