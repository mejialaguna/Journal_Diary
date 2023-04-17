import { VisibilityOffTwoTone, VisibilityTwoTone } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import React, { useState } from "react";

export const InputAdornmentComponent = ({
  handleClickShowPassword,
  showPassword,
  handleMouseDownPassword,
}) => {
  return (
    <InputAdornment position="end">
      <IconButton
        aria-label="toggle password visibility"
        onClick={handleClickShowPassword}
        onMouseDown={handleMouseDownPassword}
        edge="end"
      >
        {showPassword ? <VisibilityOffTwoTone /> : <VisibilityTwoTone />}
      </IconButton>
    </InputAdornment>
  );
};
