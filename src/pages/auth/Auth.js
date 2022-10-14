import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.scss';
import PlannerImg from '../../assets/weekly-planner.png';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { Button } from '@mui/material';
import { setLocalStorage } from '../../helpers/LocalStorage';
import { login } from '../../services/api';
import Error from '../../helpers/Error';
import useForm from '../../hooks/UseForm';

import { RecoverPassDialog } from '../../components/Dialogs/RecoverPassDialog';

export const Auth = () => {
  const navigate = useNavigate();
  const email = useForm('email');
  const password = useForm();

  const [showPassword, setShowPassword] = React.useState(false);
  const [openRecoverPass, setOpenRecoverPass] = React.useState(false);

  const handleClickOpenRecoverDialog = () => {
    setOpenRecoverPass(true);
  };

  const handleCloseRecoverDialog = () => {
    setOpenRecoverPass(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email.validate() && password.validate()) {
      const response = await login({
        email: email.value,
        password: password.value,
      });

      if (response.status === 200) {
        let auth = {
          isAuthenticated: true,
          user: response.data.user,
        };

        setLocalStorage('auth', auth);
        setLocalStorage('userId', auth.user.id);

        setTimeout(() => {
          navigate('/');
        }, 1000);
      }
    }
  };

  return (
    <Box className="container container-md">
      <Grid container spacing={4} className="grid">
        <Grid
          item
          xs={12}
          sm={12}
          md={7}
          lg={7}
          xl={7}
          className="container-img"
        >
          <div className="img-container">
            <img src={PlannerImg} alt="" />
            <h2>Plan your entire life in one place.</h2>
          </div>
          <p>
            Organize your work, your studies, personal tasks and all the other
            duties you want.
          </p>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={5}
          lg={5}
          xl={5}
          className="container-login"
        >
          <Card className="card card-auth">
            <div className="card-body">
              <h2>Login</h2>
              <form onSubmit={handleSubmit}>
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

                <FormControl className="password" variant="outlined">
                  <small> Password</small>
                  <OutlinedInput
                    required
                    size="small"
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                    value={password.value}
                    onChange={password.onChange}
                    onBlur={password.onBlur}
                  />
                  {password.error && <Error error={password.error} />}
                </FormControl>
                <Button
                  variant="contained"
                  type="submit"
                  label="Sign in"
                  disabled={Boolean(
                    email.error ||
                      email.value.length === 0 ||
                      password.error ||
                      password.value.length === 0
                  )}
                >
                  Sign In
                </Button>
              </form>

              <span onClick={() => handleClickOpenRecoverDialog()}>
                Forgot password?
              </span>
            </div>

            <div className="card-footer">
              <p>Don't have an account?</p>
              <Button size="small" variant="contained">
                Sign up
              </Button>
            </div>
          </Card>
        </Grid>
      </Grid>
      <RecoverPassDialog
        open={openRecoverPass}
        onClose={handleCloseRecoverDialog}
      />
    </Box>
  );
};
