import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';

import InputAdornment from '@mui/material/InputAdornment';

import './Password.scss';
import Error from '../../helpers/Error';
import useForm from '../../hooks/UseForm';
import { resetPassword } from '../../services/api';

export const Password = () => {
  const navigate = useNavigate();
  const password = useForm('password');
  const confirmPassword = useForm();

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const disabledButton = () => {
    let disabled = false;

    if (
      password.error ||
      password.value.length === 0 ||
      confirmPassword.error ||
      confirmPassword.value.length === 0
    )
      disabled = true;
    else disabled = false;
    return disabled;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      password: password.value,
    };

    console.log(data);

    // if (email.validate() && password.validate()) {
    //   const response = await resetPassword(data);

    //   if (response.status === 200) {
    //     setTimeout(() => {
    //       navigate('/auth');
    //     }, 1000);
    //   }
    // }
  };

  return (
    <Box className="container container-password">
      <h1>New password</h1>

      <Card className="card">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <FormControl fullWidth>
                <small> Password</small>
                <OutlinedInput
                  required
                  size="small"
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} edge="end">
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
            </Grid>

            <Grid item xs={12} >
              <FormControl fullWidth>
                <small> Confirm password</small>
                <OutlinedInput
                  required
                  size="small"
                  id="outlined-adornment-confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowConfirmPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Confirm Password"
                  value={confirmPassword.value}
                  onChange={confirmPassword.onChange}
                  onBlur={confirmPassword.onBlur}
                />

                {confirmPassword.value.length > 0 &&
                  password.value !== confirmPassword.value && (
                    <Error error="Passwords don't match" />
                  )}
                {confirmPassword.error && (
                  <Error error={confirmPassword.error} />
                )}
              </FormControl>
            </Grid>
          </Grid>

          <Button variant="contained" type="submit" disabled={disabledButton()}>
            Sign Up
          </Button>
        </form>
      </Card>

      <div className="logo">
        <h3 onClick={() => navigate('/')}>Weekly Planner</h3>
      </div>
    </Box>
  );
};
