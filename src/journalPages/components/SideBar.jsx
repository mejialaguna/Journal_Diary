import React, { useRef } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Grid,
  List,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";

import { ToolTip } from "./";
import { NoteList } from "./";

import { startSavingUserAvatarImgUrl } from "../../store";

export const SideBar = ({ drawerWidth = "240px" }) => {
  const { displayName, photoURL } = useSelector((state) => state.auth);
  const { notes, isSaving } = useSelector((state) => state.journal);

  const dispatch = useDispatch();

  // adding reference from input to icon btn avatar
  const fileInfoERef = useRef();

  const onFileChange = async ({ target }) => {
    if (target.files === 0) return;

    dispatch(startSavingUserAvatarImgUrl(target.files));
  };

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
            <Grid
              className="animate__animated animate__bounceIn animate__fast"
              item
              display={"flex"}
              alignItems="center"
            >
              <ToolTip title="add your avatar image" placement="right">
                <IconButton disabled={isSaving}>
                  <input
                    type="file"
                    onChange={onFileChange}
                    accept=" image/* ,.jpg, .jpeg, .png"
                    ref={fileInfoERef}
                    hidden
                  />

                  <Avatar
                    onClick={() => fileInfoERef.current.click()}
                    sx={{ bgcolor: "blueviolet", width: 45, height: 45 }}
                    alt="avatar image"
                    src={photoURL?.secure_url}
                  />
                </IconButton>
              </ToolTip>

              <Typography ml={2} letterSpacing={1}>
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
