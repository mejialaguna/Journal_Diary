import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Grid } from "@mui/material";

export function Loading() {
  return (
    <Grid
      container
      direction={"column"}
      justifyContent="center"
      alignItems={"center"}
      sx={{ backgroundColor: "primary.main", minHeight: "100vh", padding: "5" }}
    >
      <Grid item sx={{ with: { sm: 450 } }}>
        <CircularProgress color="warning" />
      </Grid>
    </Grid>
  );
}
