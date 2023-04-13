import { createSlice } from "@reduxjs/toolkit";

export const journalSlice = createSlice({
  name: "journal",
  initialState: {
    activeNote: null,
    isSaving: false,
    messageSave: "",
    notes: [],
  },
  reducers: {
    savingNewNote: (state) => {
      state.isSaving = true;
    },
    addNewEmptyNote: (state, { payload }) => {
      // since notes array is empty we are pushing values first
      state.notes.push(payload);
      state.isSaving = false;
    },
    setActiveNotes: (state, action) => {
      state.activeNote = action.payload;
    },
    setNotes: (state, { payload }) => {
      // we are getting all notes from fire base back into store for loading purposes
      state.notes = payload;
    },
    updateNote: (state, { payload }) => {
      state.isSaving = true;
      state.notes = state.notes.map((note) =>
        note?.id !== payload?.id ? note : payload
      );
    },
    setSaving: (state, { payload }) => {
      state.messageSave = payload;
      state.isSaving = false;
    },
    deleteNoteById: (state, { payload }) => {
      state.isSaving = true;
      state.activeNote = null;
      state.notes = state.notes.filter((note) => note.id !== payload);
    },
    clearAllNotesAfterLogout: (state) => {
      state.activeNote = null;
      state.isSaving = false;
      state.messageSave = "";
      state.notes = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addNewEmptyNote,
  deleteNoteById,
  savingNewNote,
  setActiveNotes,
  setNotes,
  setSaving,
  updateNote,
  clearAllNotesAfterLogout,
} = journalSlice.actions;
