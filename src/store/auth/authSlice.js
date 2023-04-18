import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    displayName: null,
    email: null,
    errorMessage: null,
    isSaving: null,
    photoURL: null,
    status: "checking", // "not-Authenticated", //checking
    uuid: null,
  },

  reducers: {
    //------------
    login: (state, { payload }) => {
      state.displayName = payload.displayName;
      state.email = payload.email;
      state.errorMessage = null;
      state.photoURL = payload.photoURL;
      state.status = "Authenticated";
      state.uuid = payload.uid;
    },
    //------------
    logout: (state, { payload }) => {
      state.displayName = null;
      state.email = null;
      state.errorMessage = payload?.errorMessage;
      state.photoURL = null;
      state.status = "not-Authenticated";
      state.uuid = null;
    },
    //------------
    checkingCredential: (state) => {
      state.status = "checking";
    },

    setAvatarUserUrl: (state, { payload }) => {
      state.isSaving = true;
      state.photoURL = payload;
    },
    setIsSaving: (state) => {
      state.isSaving = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAvatarUserUrl, login, logout, checkingCredential } =
  authSlice.actions;
