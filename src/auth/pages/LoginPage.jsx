import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link as RouterLink } from "react-router-dom";

import {
  Grid,
  TextField,
  Typography,
  Button,
  Link,
  Alert,
  AlertTitle,
} from "@mui/material";
import { Google } from "@mui/icons-material";
import { AuthLayout } from "../layout/AuthLayout";

import { useForm } from "../../hooks";
import {
  checkingAuthentication,
  startLoginWithEmailAndPassword,
  startGoogleSignIn,
} from "../../store";
import { InputAdornmentComponent } from "../../journalPages/components/InputAdornmentComponent";

const form = {
  email: "",
  password: "",
};

export function LoginPage() {
  const { status, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  //look that the form object is outside the component
  const { email, password, onInputChange } = useForm(form);

  const isAuthenticating = useMemo(() => status === "checking", [status]);

  // const authenticated = useMemo(() => status === "Authenticated", [status]);

  const onSubmit = (e) => {
    e.preventDefault();
    //doing this from my thunk file in this case
    // dispatch(checkingAuthentication());

    dispatch(startLoginWithEmailAndPassword({ email, password }));
  };

  const onGoogleSignIn = (e) => {
    e.preventDefault();
    dispatch(startGoogleSignIn());
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <AuthLayout header={'Login'}>
      <form className='animate__animated animate__fadeIn' onSubmit={onSubmit}>
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
              autoFocus
              required
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              id='outlined-adornment-password'
              label='Password'
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              fullWidth
              name='password'
              value={password}
              onChange={onInputChange}
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
            <Grid item xs={12} sm={6}>
              <Button
                variant='contained'
                fullWidth
                type='submit'
                disabled={isAuthenticating}
              >
                Login
              </Button>
            </Grid>

            {/* <Grid item xs={12} sm={6}>
              <Button
                variant='contained'
                fullWidth
                onClick={onGoogleSignIn}
                disabled={isAuthenticating}
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid> */}
            <Grid item xs={12} sm={6}>
              <Button disabled={isAuthenticating} variant='contained' fullWidth>
                <Link
                  sx={{ color: 'white', textDecoration: 'none', width: '100%' }}
                  // fullWidth
                  component={RouterLink} // this is the reference to the Link tag from React router dom since we are using MUI it needs to be like this , because we are using the LINK tag from MUI first and after we are refering to the link tag of React router dom inside the component method. we re-named "RouterLink" son they dont colide between the LINK tag of MUI and React router dom.
                  to='/auth/register'
                >
                  Sign up
                </Link>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
}
