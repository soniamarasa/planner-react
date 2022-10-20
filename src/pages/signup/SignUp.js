import React from 'react';
import Card from '@mui/material/Card';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { Grid } from '@mui/material';
import { Button } from '@mui/material';
import { UserImg } from '../../components/UserImg/UserImg';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';

import './SignUp.scss';
import Error from '../../helpers/Error';
import useForm from '../../hooks/UseForm';
import { createAccount } from '../../services/api';

export const SignUp = () => {
  const navigate = useNavigate();
  const name = useForm();
  const gender = useForm();
  const email = useForm('email');
  const confirmEmail = useForm('email');
  const password = useForm('password');
  const confirmPassword = useForm();

  const [birthdate, setBirthdate] = React.useState(dayjs(''));
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const genders = [
    { name: 'Female', code: 'female' },
    { name: 'Male', code: 'male' },
  ];

  const handleChangeBirthdate = (dateValue) => {
    setBirthdate(dateValue);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const disabledButton = () => {
    let disabled = false;

    if (
      name.error ||
      name.value.length === 0 ||
      gender.value === '0' ||
      birthdate.length === 0 ||
      email.error ||
      email.value.length === 0 ||
      confirmEmail.error ||
      confirmEmail.value.length === 0 ||
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
      name: name.value,
      gender: gender.value,
      birthdate: birthdate.format(),
      email: email.value,
      password: password.value,
    };

    if (email.validate() && password.validate()) {
      const response = await createAccount(data);

      if (response.status === 200) {
        setTimeout(() => {
          navigate('/auth');
        }, 1000);
      }
    }
  };

  return (
    <div className="container sign-up  container-sm">
      <Box spacing={2}>
        <h1>Sign up</h1>

        <Grid item xs={12}>
          <Card className="card">
            <div className="user-img">
              <UserImg gender={gender.value} />
            </div>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <small>Name</small>
                    <TextField
                      error
                      required
                      fullWidth
                      type="text"
                      size="small"
                      value={name.value}
                      onChange={name.onChange}
                      onBlur={name.onBlur}
                    />
                    {name.error && <Error error={name.error} />}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <FormControl fullWidth>
                    <small>Gender</small>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={gender.value || '0'}
                      onChange={gender.onChange}
                      onBlur={gender.onBlur}
                      size="small"
                    >
                      <MenuItem disabled value="0">
                        <em>Select gender</em>
                      </MenuItem>
                      {genders.map((gender) => (
                        <MenuItem key={gender.code} value={gender.code}>
                          {gender.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {gender.error && <Error error={gender.error} />}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <FormControl fullWidth>
                    <small>Birthdate</small>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Stack spacing={3}>
                        <DesktopDatePicker
                          inputFormat="DD/MM/YYYY"
                          value={birthdate}
                          onChange={handleChangeBirthdate}
                          renderInput={(params) => (
                            <TextField size="small" {...params} />
                          )}
                        />
                      </Stack>
                    </LocalizationProvider>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <FormControl fullWidth>
                    <small>E-mail</small>
                    <TextField
                      error
                      required
                      fullWidth
                      type="email"
                      size="small"
                      value={email.value}
                      onChange={email.onChange}
                      onBlur={email.onBlur}
                    />
                    {email.error && <Error error={email.error} />}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <FormControl fullWidth>
                    <small>Confirm E-mail</small>
                    <TextField
                      error
                      required
                      fullWidth
                      type="email"
                      size="small"
                      value={confirmEmail.value}
                      onChange={confirmEmail.onChange}
                      onBlur={confirmEmail.onBlur}
                    />
                    {confirmEmail.value.length > 0 &&
                      confirmEmail.value !== email.value && (
                        <Error error="Emails don't match" />
                      )}
                    {confirmEmail.error && <Error error={confirmEmail.error} />}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <FormControl fullWidth>
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
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
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

              <Button
                variant="contained"
                type="submit"
                disabled={disabledButton()}
              >
                Sign Up
              </Button>
            </form>
          </Card>

          <div className="logo">
            <h3 onClick={() => navigate('/')}>Weekly Planner</h3>
          </div>
        </Grid>
      </Box>
    </div>
  );
};
