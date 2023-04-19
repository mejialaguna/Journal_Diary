import { useState } from "react";
import { useDispatch } from "react-redux";

import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { LoginOutlined } from "@mui/icons-material";
import { clearAllNotesAfterLogout, startLogout } from "../../store";
import { ToolTip } from "./ToolTip";
import { ConfirmDialog } from "./ConfirmDialog";

export const NavBar = ({ drawerWidth }) => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(clearAllNotesAfterLogout());
    dispatch(startLogout());
  };

  const handleClickOpen = () => {
    setOpen(true);
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
            <ToolTip title="Logout" placement="left">
              <IconButton color="error" onClick={handleClickOpen}>
                <LoginOutlined />
              </IconButton>
            </ToolTip>
          </Grid>
        </Grid>

        <ConfirmDialog
          open={open}
          setOpen={setOpen}
          action={onLogout}
          actionMessage="logout"
        />
      </Toolbar>
    </AppBar>
  );
};
