import React from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import { login } from '../../services/api';

const defaultValue = {
  email: '',
  password: '',
};

export const Auth = () => {
  const navigate = useNavigate();

  const [values, setValues] = React.useState({
    email: '',
    password: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = JSON.parse(JSON.stringify(values));
    delete payload['showPassword'];
    const response = await login(payload);

    if (response.status === 200) {
      window.localStorage.setItem('auth', { ola: 'mundo' });
      navigate('/');
    }
    console.log(response);
  };

  return (
    <Box className="container">
      <Grid container spacing={2} className="grid">
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={8}
          xl={8}
          className="container-img"
        >
          <div className="img">
            <img src="../../../assets/weekly-planner.png" alt="" />
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
          md={6}
          lg={4}
          xl={4}
          className="container-login"
        >
          <Card className='card'>
            <div className="card-body">
              <h2>Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="field">
                  <TextField
                    id="outlined-email-input"
                    label="email"
                    type="email"
                    onChange={handleChange('email')}
                    autoComplete="current-email"
                  />
                </div>

                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          // onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
                <button type="submit" label="Sign in">
                  Logar
                </button>
              </form>

              <span>Forgot password?</span>
            </div>

            <div className="footer">
              <p>Don't have an account?</p>
              <button>Sign up</button>
            </div>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
