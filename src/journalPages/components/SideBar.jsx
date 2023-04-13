import React from "react";

import { useSelector } from "react-redux";

import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Grid,
  List,
  Toolbar,
  Typography,
} from "@mui/material";

import { NoteList } from "./";

function stringAvatar(name) {
  return {
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

export const SideBar = ({ drawerWidth = "240px" }) => {
  const { displayName } = useSelector((state) => state.auth);
  const { notes } = useSelector((state) => state.journal);

  return (
    <Box
      component="nav"
      sx={{
        width: { sm: drawerWidth },
        flexShrink: { sm: 0 },
      }}
    >
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar
          sx={{
            justifyContent: "center",
            backgroundColor: "primary.main",
            color: "white",
          }}
        >
          <Grid container justifyContent="space-around">
            <Grid item display={"flex"} alignItems="center">
              <Avatar
                {...stringAvatar(displayName)}
                sx={{ bgcolor: "blueviolet" }}
              />
              <Typography
                ml={2}
                className="animate__animated animate__bounceIn animate__fast"
                letterSpacing={1}
              >
                <b> {displayName} </b>
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
        <Divider />
        <List className="animate__animated animate__fadeInLeft animate__slow">
          {notes?.map((note) => (
            <NoteList key={note.id} {...note} />
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
