import { Grid, Popover, Typography } from "@mui/material";
import React from "react";

export const PopoverComp = ({ handleClose, name, id, open, anchorElement }) => {
  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorElement}
      onClose={handleClose}
      anchorReference="anchorPosition"
      anchorPosition={{ top: 800, left: 1000 }}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
    >
      <Grid container flexDirection={"column-reverse"} alignItems="center">
        <Typography
          sx={{
            fontSize: 30,
            texTransform: "uppercase",
            fontWeight: 900,
          }}
        >
          {name}
        </Typography>
        <img src={anchorElement?.src} alt="popover" width="400" />
      </Grid>
    </Popover>
  );
};
