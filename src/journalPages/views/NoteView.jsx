import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { dateFormatter, useForm } from "../../hooks";
import {
  DeleteOneNote,
  setActiveNotes,
  startUpdatingActiveNote,
} from "../../store";
import { ImageGallery, ToolTip } from "../components";

export const NoteView = ({ setShowSnackbar }) => {
  const dispatch = useDispatch();
  const { activeNote } = useSelector((state) => state.journal);

  const {
    id,
    title,
    body,
    date,
    imageUrls = [],
    onInputChange,
    formState,
  } = useForm(activeNote);

  const formattedDate = dateFormatter(date);

  useEffect(() => {
    dispatch(setActiveNotes(formState));
  }, [formState]);

  const startUpdatingNote = () => {
    dispatch(startUpdatingActiveNote(formState));
    setShowSnackbar(true);
  };

  const deleteNote = () => {
    dispatch(DeleteOneNote());
    setShowSnackbar(true);
  };

  return (
    <Grid
      alignItems="center"
      className="animate__animated animate__fadeIn"
      container
      direction="row"
      justifyContent="space-between"
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          {formattedDate}
        </Typography>
      </Grid>

      <Grid item>
        <Button sx={{ padding: 2, color: "green" }} onClick={startUpdatingNote}>
          <SaveIcon sx={{ fontSize: 30, color: "green", mr: 2 }} />
          Save
        </Button>

        <ToolTip title="Delete" placement="bottom">
          <Button sx={{ padding: 2, color: "error.main" }} onClick={deleteNote}>
            <DeleteIcon sx={{ fontSize: 30, color: "error.main", mr: 2 }} />
            delete
          </Button>
        </ToolTip>
      </Grid>

      <Grid container>
        <TextField
          type="text"
          variant="standard"
          fullWidth
          placeholder="add title"
          sx={{ border: "none", mb: 1 }}
          label="Title"
          name="title"
          value={title}
          onChange={onInputChange}
        />
      </Grid>

      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="Add Diary Journey"
          sx={{ mb: 1 }}
          label="Add Diary Journey"
          minRows={10}
          name="body"
          value={body}
          onChange={onInputChange}
        />
      </Grid>

      <Grid container>
        <ImageGallery />
      </Grid>
    </Grid>
  );
};
