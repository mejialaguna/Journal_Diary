import { Box, Toolbar } from "@mui/material";
import React from "react";
import { NavBar, SideBar } from "../components";

export const JournalLayout = ({ children }) => {
  const drawerWidth = 240;
  return (
    <Box className="animate__animated animate__fadeIn" sx={{ display: "flex" }}>
      <NavBar drawerWidth={drawerWidth} />

      <SideBar drawerWidth={drawerWidth} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};
