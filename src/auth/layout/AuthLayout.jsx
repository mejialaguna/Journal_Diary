import { Grid, Typography } from "@mui/material";
import React from "react";

export const AuthLayout = ({ children, header }) => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh", backgroundColor: "primary.main", padding: 4 }} //style extend from MUI
    >
      <Grid
        item
        style={{ boxShadow: "0px 5px 5px rgba(0,0,0.2)" }}
        xs={3} // screen size selection
        sx={{
          width: { sm: "450px" },
          backgroundColor: "white",
          padding: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" sx={{ mb: 1 }}>
          {header}
        </Typography>

        {children}
      </Grid>
    </Grid>
  );
};
