// import { FirebaseDB } from "../../firebase/config";
import {
  logoutFirebase,
  registerUserWithEmailAndPassword,
  signInUserWithEmailAndPassword,
  signInWithGoogle,
} from "../../firebase/providers";
// import { fileUpload } from "../../helpers";
import { checkingCredential, logout, login } from "./";

export const checkingAuthentication = (email, Password) => {
  return async (dispatch) => {
    dispatch(checkingCredential());
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredential());

    const response = await signInWithGoogle();

    if (!response.ok) {
      return dispatch(logout(response.errorMessage));
    }

    dispatch(login(response));
  };
};

export const startCreatingUserWithEmailAndPassword = ({
  email,
  password,
  displayName,
}) => {
  return async (dispatch) => {
    dispatch(checkingCredential());

    const response = await registerUserWithEmailAndPassword({
      email,
      password,
      displayName,
    });

    if (!response.ok) {
      return dispatch(logout(response));
    }

    dispatch(login(response));
  };
};

//----------------

export const startLoginWithEmailAndPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredential());

    const response = await signInUserWithEmailAndPassword({
      email,
      password,
    });

    if (!response.ok) {
      return dispatch(logout(response));
    }

    dispatch(login(response));
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    const { errorMessage } = await logoutFirebase();

    dispatch(logout({ errorMessage }));
  };
};
