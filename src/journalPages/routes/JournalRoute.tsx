import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { JournalPage } from "../";

export const JournalRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<JournalPage />} />

      <Route path="/*" element={<Navigate to={"/"} />} />
    </Routes>
  );
};
