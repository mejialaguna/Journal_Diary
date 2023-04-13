import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import { TurnedInNot } from "@mui/icons-material";
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { setActiveNotes } from "../../store";

export const NoteList = ({ title = "", body, id, date, imageUrls = [] }) => {
  // const { id, title = "", body, imageUrls = [], date } = note;
  const dispatch = useDispatch();

  const newTitle = useMemo(() => {
    if (title.length > 10) {
      return title.substring(0, 17) + "...";
    } else {
      return title;
    }
  }, [title]);

  const newBody = useMemo(() => {
    if (body.length > 25) {
      return body.substring(0, 40) + "...";
    } else {
      return body;
    }
  }, [body]);

  const onclickNote = () => {
    dispatch(setActiveNotes({ id, title, body, imageUrls: [], date }));
  };

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={onclickNote}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>

        <Grid container>
          <ListItemText primary={<b> {newTitle} </b>} />
          <ListItemText secondary={newBody} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
