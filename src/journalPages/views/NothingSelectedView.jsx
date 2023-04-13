import { StarOutline } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";

export const NothingSelectedView = () => {
  return (
    <Grid
      container
      className="animate__animated animate__fadeIn"
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      borderRadius={3}
      sx={{ minHeight: "calc(100vh - 110px)", backgroundColor: "primary.main" }}
    >
      <Grid item xs={12}>
        <StarOutline sx={{ fontSize: 100, color: "white" }} />
      </Grid>

      <Grid item xs={12}>
        <Typography sx={{ color: "white", letterSpacing: 1 }}>
          <b> Select or add a New Entry</b>
        </Typography>
      </Grid>
    </Grid>
  );
};
