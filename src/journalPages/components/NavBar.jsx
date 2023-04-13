import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  AppBar,
  Avatar,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { LoginOutlined } from "@mui/icons-material";
import { clearAllNotesAfterLogout, startLogout } from "../../store";
import { ToolTip } from "./ToolTip";

// function stringAvatar(name) {
//   return {
//     children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
//   };
// }

export const NavBar = ({ drawerWidth }) => {
  const dispatch = useDispatch();
  const { displayName } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(clearAllNotesAfterLogout());
    dispatch(startLogout());
  };
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: drawerWidth },
      }}
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item>
            <Typography variant="h6" letterSpacing={1}>
              Journal App
            </Typography>
          </Grid>

          <Grid item display={"flex"} alignItems="center">
            {/* <Avatar
              {...stringAvatar(displayName)}
              sx={{ bgcolor: "blueviolet" }}
            /> */}

            <ToolTip title="Logout" placement="left">
              <IconButton color="error" onClick={onLogout}>
                <LoginOutlined />
              </IconButton>
            </ToolTip>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
