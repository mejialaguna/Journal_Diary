import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import {
  addNewEmptyNote,
  deleteNoteById,
  savingNewNote,
  setActiveNotes,
  setNotes,
  setSaving,
  updateNote,
} from "./journalSlice";

// --------------------> POST
export const startNewNote = () => {
  //! getState is a function the help us get all the info state from our store.
  return async (dispatch, getState) => {
    dispatch(savingNewNote());

    //this is the user id
    const { uuid: uid } = getState().auth;

    const newNote = {
      body: "",
      date: new Date().getTime(),
      title: "",
    };

    try {
      const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
      await setDoc(newDoc, newNote);

      // adding the note id to the object.
      newNote.id = newDoc.id;

      dispatch(addNewEmptyNote(newNote));
      dispatch(setActiveNotes(newNote));
    } catch (error) {
      console.error(error);
    }
  };
};

// --------------------> READ
export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    //this is the user id
    const { uuid: uid } = getState().auth;

    const querySnapshot = await getDocs(
      collection(FirebaseDB, `${uid}/journal/notes`)
    );

    let notesCollection = [];

    querySnapshot.forEach((doc) => {
      // each note entry id
      const id = doc.id;
      notesCollection.push({ id, ...doc.data() });
    });

    dispatch(setNotes(notesCollection));
  };
};

// --------------------> UPDATE
export const startUpdatingActiveNote = (formState) => {
  return async (dispatch, getState) => {
    const { uuid } = getState().auth;
    const { activeNote } = getState().journal;

    const noteRef = doc(FirebaseDB, `${uuid}/journal/notes/${activeNote.id}`);

    try {
      await updateDoc(noteRef, activeNote);
      dispatch(updateNote(activeNote));
      dispatch(setSaving("Note successfully updated"));
    } catch (error) {
      dispatch(setSaving("Error updating note"));
      console.error("Error updating note: ", error);
    }
  };
};

// --------------------> DELETE
export const DeleteOneNote = () => {
  return async (dispatch, getState) => {
    const { uuid: uid } = getState().auth;
    const { id } = getState().journal.activeNote;

    try {
      console.log(id, "deleted");
      await deleteDoc(doc(FirebaseDB, `${uid}/journal/notes/${id}`));
      dispatch(deleteNoteById(id));
      dispatch(setSaving("Note successfully deleted"));

      return {
        ok: true,
      };
    } catch (error) {
      dispatch(setSaving("Error deleting note"));
      console.error("Error deleting note: ", error);

      return {
        ok: false,
      };
    }
  };
};
