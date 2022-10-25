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
import { Box } from '@mui/material';
import { Grid } from '@mui/material';
import { Button } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import Error from '../../helpers/Error';
import useForm from '../../hooks/UseForm';
import { getUser, updateUser } from '../../services/api';
import { UserImg } from '../../components/UserImg/UserImg';
import './Account.scss';

export const Account = () => {
  const name = useForm();
  const gender = useForm();
  const email = useForm('email');
  const oldPassword = useForm();
  const password = useForm('password');
  const confirmPassword = useForm();

  const [birthdate, setBirthdate] = React.useState(dayjs('').format());
  const [showOldPassword, setOldPassword] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const genders = [
    { name: 'Female', code: 'female' },
    { name: 'Male', code: 'male' },
  ];

  const handleChangeBirthdate = (dateValue) => {
    setBirthdate(dateValue);
  };

  const handleClickShowOldPassword = () => {
    setOldPassword(!showOldPassword);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const showButton = () => {
    if (name.changed || email.changed || birthdate.changed || gender.changed)
      return true;
    else return false;
  };

  const disabledButton = () => {
    let disabled = false;

    if (
      name.error ||
      name.value?.length === 0 ||
      gender.value === '0' ||
      birthdate?.length === 0 ||
      email.error ||
      email.value?.length === 0
    )
      disabled = true;
    else disabled = false;
    return disabled;
  };

  const disabledButtonPass = () => {
    let disabled = false;

    if (
      password.error ||
      password.value?.length === 0 ||
      oldPassword.error ||
      oldPassword?.value.length === 0 ||
      confirmPassword.error ||
      confirmPassword?.value.length === 0 ||
      password?.value !== confirmPassword?.value
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
      birthdate: birthdate,
      email: email.value,
    };

    if (email.validate()) {
      await updateUser(data);
    }
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();

    const data = {
      name: name.value,
      gender: gender.value,
      birthdate: birthdate,
      email: email.value,
      oldPassword: oldPassword.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    };

    if (oldPassword.validate() && password.validate()) {
      await updateUser(data);
    }
  };

  React.useEffect(() => {
    getUser().then(({ data }) => {
      name.setValue(data.name);
      gender.setValue(data.gender);
      email.setValue(data.email);
      setBirthdate(data.birthdate);
    });
  }, []);

  return (
    <div className="container account container-md">
      <h1>Account</h1>
      <Box>
        <Grid container spacing={2}>
          <Grid className="grid-img" item xs={12} sm={2} md={2} lg={2} xl={2}>
            <div className="user-img">
              <UserImg gender={gender.value} />
            </div>
          </Grid>
          <Grid item xs={12} sm={10} md={10} lg={10} xl={10}>
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
                        disabled
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
                    {showButton() && (
                      <Button
                        variant="contained"
                        type="submit"
                        disabled={disabledButton()}
                      >
                        Save
                      </Button>
                    )}
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
                        type={showOldPassword ? 'text' : 'password'}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClickShowOldPassword}
                              edge="end"
                            >
                              {showOldPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                        value={oldPassword.value}
                        onChange={oldPassword.onChange}
                        onBlur={oldPassword.onBlur}
                      />

                      {oldPassword.error && <Error error={oldPassword.error} />}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={6}>
                    <FormControl fullWidth>
                      <small> New password</small>
                      <OutlinedInput
                        required
                        size="small"
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
                    {oldPassword.value.length > 0 && password.value.length > 0 && (
                      <Button
                        variant="contained"
                        type="submit"
                        disabled={disabledButtonPass()}
                      >
                        Change Password
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </form>
            </Card>
            {/* <div className=" reset buttons">
              <Button variant="contained">Reset</Button>
            </div> */}
          </Grid>
        </Grid>
      </Box>{' '}
    </div>
  );
};
