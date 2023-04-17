import { Grid, Popover, Typography } from "@mui/material";
import React from "react";

export const PopoverComp = ({ anchorElement, handleClose, id, name, open }) => {
  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorElement}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "center",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "center",
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
