import { createSlice } from "@reduxjs/toolkit";

export const journalSlice = createSlice({
  name: "journal",
  initialState: {
    isSaving: false,
    messageSave: "",
    notes: [],
    activeNote: null,

    //how active note should look
    // activeNote: {
    //   id: "",
    //   title: "",
    //   date: "",
    //   body: "",
    //   imageUrls: ""
    // }
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
      state.isSaving = false;
      state.messageSave = payload;
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
    setPhotosToActiveNotes: (state, { payload }) => {
      //adding all images link to active note so it can be save after
      state.activeNote.imageUrls = [...state.activeNote.imageUrls, ...payload];
      state.isSaving = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addNewEmptyNote,
  clearAllNotesAfterLogout,
  deleteNoteById,
  savingNewNote,
  setActiveNotes,
  setNotes,
  setPhotosToActiveNotes,
  setSaving,
  updateNote,
} = journalSlice.actions;
