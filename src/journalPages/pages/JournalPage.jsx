import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { JournalLayout } from "../Layout/JournalLayout";
import { ToolTip } from "../components";
import { NoteView, NothingSelectedView } from "../views";
import { startNewNote } from "../../store";

import { Alert, Fab, Snackbar } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export function JournalPage() {
  const dispatch = useDispatch();

  const { isSaving, activeNote, messageSave } = useSelector(
    (state) => state.journal
  );

  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleAddNewEmptyNote = () => {
    dispatch(startNewNote());
  };

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  return (
    <JournalLayout>
      {!!activeNote ? (
        <NoteView setShowSnackbar={setShowSnackbar} />
      ) : (
        <NothingSelectedView />
      )}

      <ToolTip title="Add new note" placement="left">
        <Fab
          sx={{
            position: "fixed",
            right: 50,
            bottom: 50,
            backgroundColor: "error.main",
            opacity: 0.5,
            ":hover": { backgroundColor: "error.main", opacity: 1 },
            animation: "ease-in-out",
            transition: "500ms",
          }}
          color="secondary"
          aria-label="add"
          onClick={handleAddNewEmptyNote}
          disabled={isSaving}
        >
          <AddIcon />
        </Fab>
      </ToolTip>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3500}
        onClose={handleCloseSnackbar}
      >
        <Alert
          severity={
            messageSave === "Note successfully updated" ? "success" : "error"
          }
          sx={{ width: "100%" }}
        >
          <b>{messageSave}!</b>
        </Alert>
      </Snackbar>
    </JournalLayout>
  );
}
