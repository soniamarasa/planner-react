import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import useForm from '../../hooks/UseForm';
import Error from '../../helpers/Error';
import { retrievePassword } from '../../services/api';

export const RecoverPassDialog = (props) => {
  const email = useForm('email');
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email.validate()) {
      const response = await retrievePassword({
        email: email.value,
        host: window.location.origin,
      });

      if (response.status === 200) {
        handleClose();
      }
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
      className="dialog-recover-pass theme-01"
    >
      <DialogTitle id="dialog-title">Forgot your password?</DialogTitle>
      <DialogContent>
        <DialogContentText id="dialog-description">
          That's okay, it happens! Confirm your email and we'll send the
          Instructions
        </DialogContentText>

        <form>
          <FormControl>
            <small>E-mail</small>
            <TextField
              error
              required
              id="outlined-email-input"
              fullWidth
              type="email"
              size="small"
              value={email.value}
              onChange={email.onChange}
              onBlur={email.onBlur}
            />
            {email.error && <Error error={email.error} />}
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          disabled={Boolean(email.error || email.value.length === 0)}
          onClick={handleSubmit}
          autoFocus
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
