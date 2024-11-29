import { useMemo, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Link as RouterLink } from "react-router-dom";

import {
  Alert,
  AlertTitle,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";

import { AuthLayout } from "../layout";
import { useForm } from "../../hooks";
import { startCreatingUserWithEmailAndPassword } from "../../store";
import { InputAdornmentComponent } from "../../journalPages/components";

function validatePassword(value) {
  // Check if password includes at least one special character
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{9,}$/;

  if (regex.test(value)) {
    return true;
  }

  return false;
}

const validator = {
  email: [
    (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      return emailRegex.test(value);
    },
    "this is not a valid email, eg'email@domain.com'",
  ],
  password: [
    (value) => validatePassword(value),
    "password should contain more than 8 characters, 1 special character and 1 Capital letter",
  ],
  displayName: [(name) => name.length >= 4, "Name is required"],
};

const form = {
  email: "",
  password: "",
  displayName: "",
};

export const RegisterPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector((state) => state.auth);

  const {
    email,
    password,
    displayName,
    onInputChange,
    formState,
    isFormValid,
    emailValid,
    passwordValid,
    displayNameValid,
  } = useForm(form, validator);

  const isAuthenticating = useMemo(() => status === "checking", [status]);

  const onSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true); // we are setting if the form got submitted, if it get submitted will turn to true.

    if (!isFormValid) {
      setError(true); // when the error will show.
      return;
    } // we are checking if the form is valid or not , if is not valid it will just return and fire all of the errors.

    dispatch(startCreatingUserWithEmailAndPassword(formState));
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <AuthLayout header={'Register'}>
      {/* <h1>form Valid: {!isFormValid ? "no valid" : "valid"}</h1> */}
      <form
        className='animate__animated animate__fadeIn animation-duration: 3s'
        onSubmit={onSubmit}
      >
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Full Name'
              type='text'
              placeholder='Full Name'
              fullWidth
              name='displayName'
              value={displayName}
              onChange={onInputChange}
              error={formSubmitted && error && displayNameValid}
              helperText={formSubmitted && error && displayNameValid}
              autoFocus
              required
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Email'
              type='email'
              placeholder='email@domain.com'
              fullWidth
              name='email'
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmitted}
              helperText={formSubmitted && error && emailValid}
              required
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }} position={'relative'}>
            <TextField
              label='Password'
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              fullWidth
              name='password'
              value={password}
              onChange={onInputChange}
              error={formSubmitted && error && passwordValid}
              helperText={formSubmitted && error && passwordValid}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornmentComponent
                    handleClickShowPassword={handleClickShowPassword}
                    showPassword={showPassword}
                    handleMouseDownPassword={handleMouseDownPassword}
                  />
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} display={errorMessage ? 'block' : 'none'} mt={2}>
            <Alert severity='error'>
              <AlertTitle>Error</AlertTitle>
              <strong>{errorMessage}!</strong>
            </Alert>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12}>
              <Button
                variant='contained'
                fullWidth
                type='submit'
                disabled={isAuthenticating}
              >
                Create
              </Button>
            </Grid>

            {/* <Grid item xs={12} sm={6}>
              <Button variant="contained" fullWidth>
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid> */}
          </Grid>

          <Grid container direction={'row'} justifyContent='end'>
            <Typography sx={{ mr: 1 }}> already have an account? </Typography>
            <Link
              color={'inherit'}
              component={RouterLink} // this is the reference to the Link tag from React router dom since we are using MUI it needs to be like this , because we are using the LINK tag from MUI first and after we are refering to the link tag of React router dom inside the component method. we re-named "RouterLink" son they dont colide between the LINK tag of MUI and React router dom.
              to='/auth/login'
            >
              Login.
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
