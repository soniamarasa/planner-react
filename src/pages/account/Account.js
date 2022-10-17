import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';
import { UserImg } from '../../components/UserImg/UserImg';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';

import Error from '../../helpers/Error';
import useForm from '../../hooks/UseForm';
import { updateUser } from '../../services/api';
import './Account.scss';

export const Account = () => {
  const navigate = useNavigate();
  const name = useForm();
  const gender = useForm();
  const email = useForm('email');
  const currentPassword = useForm();
  const password = useForm('password');
  const confirmPassword = useForm();

  const [birthdate, setBirthdate] = React.useState(dayjs(''));
  const [showCurrentPassword, setCurrentPassword] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const genders = [
    { name: 'Female', code: 'female' },
    { name: 'Male', code: 'male' },
  ];

  const handleChangeBirthdate = (dateValue) => {
    setBirthdate(dateValue);
  };

  const handleClickShowCurrentPassword = () => {
    setCurrentPassword(!showCurrentPassword);
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
      password.error ||
      password.value.length === 0 ||
      currentPassword.error ||
      currentPassword.value.length === 0
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
    };

    console.log(data);

    // if (email.validate()) {
    //   const response = await updateUser(data);

    //   if (response.status === 200) {
    //     setTimeout(() => {
    //       navigate('/auth');
    //     }, 1000);
    //   }
    // }
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();

    const data = {
      password: password.value,
      currentPassword: password.value,
    };

    console.log(data);

    // if (currentPassword.validate() && password.validate()) {
    //   const response = await updateUser(data);

    //   if (response.status === 200) {
    //     setTimeout(() => {
    //       navigate('/auth');
    //     }, 1000);
    //   }
    // }
  };

  return (
    <div className="container account container-md">
      <h1>Account</h1>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={2} md={3} lg={2} xl={2}>
            <div className="user-img">
              <UserImg gender={gender.value} />
            </div>
          </Grid>
          <Grid item xs={12} sm={10} md={9} lg={10} xl={10}>
            <Card className="card">
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <TextField
                        className="name"
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

                  <Grid item xs={12}>
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

                  <Grid item xs={12} sm={4} md={4}>
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

                  <Grid item xs={12} sm={4} md={4}>
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

                  <Grid className="buttons" item xs={12} sm={4} md={4}>
                    <Button
                      variant="contained"
                      type="submit"
                      disabled={disabledButton()}
                    >
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </form>

              <h3>Password</h3>

              <form onSubmit={handleSubmitPassword}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={6}>
                    <FormControl fullWidth>
                      <small> Current Password</small>
                      <OutlinedInput
                        required
                        size="small"
                        id="outlined-adornment-password"
                        type={showCurrentPassword ? 'text' : 'password'}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClickShowCurrentPassword}
                              edge="end"
                            >
                              {showCurrentPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                        value={currentPassword.value}
                        onChange={currentPassword.onChange}
                        onBlur={currentPassword.onBlur}
                      />

                      {currentPassword.error && (
                        <Error error={currentPassword.error} />
                      )}
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
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
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

                  <Grid className="buttons" item xs={12} sm={6} md={6}>
                    <Button
                      variant="contained"
                      type="submit"
                      disabled={disabledButton()}
                    >
                      Change Password
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Card>
            <div className=" reset buttons">
              <Button variant="contained">Reset</Button>
            </div>
          </Grid>
        </Grid>
      </Box>{' '}
    </div>
  );
};
