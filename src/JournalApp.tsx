import React from "react";
import { AppRoute } from "./router/AppRoute";

import { AppTheme } from "./theme";

export const JournalApp = () => {
  return (
    <AppTheme>
      <AppRoute />
    </AppTheme>
  );
};
