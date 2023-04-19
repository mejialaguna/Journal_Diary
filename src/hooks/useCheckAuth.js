import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "../firebase/config";
import {
  login,
  logout,
  startLoadingNotes,
  startLoadingUserAvatarImageUrl,
} from "../store";

export const useCheckAuth = () => {
  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector((state) => state.auth);

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, (user) => {
      if (!user) return dispatch(logout({ errorMessage }));

      const { uid, email, displayName, photoURL } = user;

      dispatch(login({ uid, email, displayName, photoURL }));

      dispatch(startLoadingNotes());

      dispatch(startLoadingUserAvatarImageUrl());
    });
  }, []);

  return { status };
};
