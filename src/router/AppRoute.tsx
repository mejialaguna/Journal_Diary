import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { AuthRoute } from "../auth";
import { JournalRoute } from "../journalPages";
import { Loading } from "../journalPages/components";
import { useCheckAuth } from "../hooks";

export const AppRoute = () => {
  const { status } = useCheckAuth();

  // since we are using useCheckAuth hook, that hook is checking into firebase if theres is an user authenticated. if theres is not user auth i am calling the logout fn which is setting status to "not-authenticated" sending us to the login page.

  if (status === "checking") {
    return <Loading />;
  }
  return (
    <Routes>
      {status === "Authenticated" ? (
        <Route path="/*" element={<JournalRoute />} />
      ) : (
        <Route path="/auth/*" element={<AuthRoute />} />
      )}

      <Route path="/*" element={<Navigate to="./auth/login" />} />

      {/* normal way of showing routes without any authentication */}
      {/* <Route path="/auth/*" element={<AuthRoute />} />
       <Route path="/*" element={<JournalRoute />} /> */}
    </Routes>
  );
};
