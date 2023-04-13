import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "checking", // "not-Authenticated", //checking
    uuid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
  },

  reducers: {
    //------------
    login: (state, { payload }) => {
      state.status = "Authenticated";
      state.uuid = payload.uid;
      state.email = payload.email;
      state.displayName = payload.displayName;
      state.photoURL = payload.photoURL;
      state.errorMessage = null;
    },
    //------------
    logout: (state, { payload }) => {
      state.status = "not-Authenticated";
      state.uuid = null;
      state.email = null;
      state.displayName = null;
      state.photoURL = null;
      state.errorMessage = payload?.errorMessage;
    },
    //------------
    checkingCredential: (state, action) => {
      state.status = "checking";
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, checkingCredential } = authSlice.actions;
