import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { resetPlanner } from '../../services/api';
import { ItemContext } from '../../ItemContext';
import { ThemeContext } from '../../ThemeContext';

export const ResetDialog = ({ onClose, open }) => {
  const { setItems } = React.useContext(ItemContext);
  const { theme } = React.useContext(ThemeContext);

  const handleClose = () => {
    onClose();
  };

  const reset = () => {
    resetPlanner().then(() => {
      setItems([]);
      handleClose();
    });
  };

  return (
    <Dialog
      className={theme}
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Do you want to reset the week?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to reset the Week? All data will be erased!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={reset} autoFocus>
          Reset
        </Button>
      </DialogActions>
    </Dialog>
  );
};
