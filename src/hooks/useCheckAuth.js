import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "../firebase/config";
import {
  login,
  logout,
  // startLoadingAllUserData,
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

      console.log("line2:", { photoURL });

      if (!photoURL) {
        dispatch(startLoadingUserAvatarImageUrl());
      }

      dispatch(login({ uid, email, displayName, photoURL }));

      dispatch(startLoadingNotes());
    });
  }, []);

  return { status };
};
