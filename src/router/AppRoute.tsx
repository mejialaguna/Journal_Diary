import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { AuthRoute } from "../auth";
import { JournalRoute } from "../journalPages";
import { Loading } from "../journalPages/components";
import { useCheckAuth } from "../hooks";

export const AppRoute = () => {
  const { status } = useCheckAuth();

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
