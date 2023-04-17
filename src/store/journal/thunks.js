import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore/lite";

import { FirebaseDB } from "../../firebase/config";

import { setAvatarUserUrl } from "../auth";
import {
  addNewEmptyNote,
  deleteNoteById,
  savingNewNote,
  setActiveNotes,
  setNotes,
  setPhotosToActiveNotes,
  setSaving,
  updateNote,
} from "./journalSlice";

import { fileUpload } from "../../helpers";

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
      imageUrls: [],
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

    // using Docs to get more than one doc
    const querySnapshot = await getDocs(
      collection(FirebaseDB, `${uid}/journal/notes`)
    );

    let notesCollection = [];

    querySnapshot.forEach((doc) => {
      // each note entry id
      const id = doc.id;
      notesCollection.push({ id, ...doc.data() });
    });

    notesCollection.sort((a, b) => new Date(b.date) - new Date(a.date));

    dispatch(setNotes(notesCollection));
  };
};

// --------------------> UPDATE
export const startUpdatingActiveNote = () => {
  return async (dispatch, getState) => {
    const { uuid } = getState().auth;
    const { activeNote } = getState().journal;

    const noteRef = doc(FirebaseDB, `${uuid}/journal/notes/${activeNote.id}`);

    try {
      const newNoteActiveNote = { ...activeNote };
      newNoteActiveNote.date = new Date().getTime();

      await updateDoc(noteRef, newNoteActiveNote);

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

// --------------------> file upload to cloudinary

export const startUploadingFiles = (files) => {
  return async (dispatch, getState) => {
    try {
      const allImagesUrlPromises = [];
      for (const values of files) {
        allImagesUrlPromises.push(fileUpload(values));
      }

      const imgsUrls = await Promise.all(allImagesUrlPromises);

      dispatch(setPhotosToActiveNotes(imgsUrls));

      const loadedMessage = files.length > 1 ? "image" : "images";
      dispatch(setSaving(`${files.length} ${loadedMessage} uploaded`));
    } catch (error) {
      dispatch(setSaving(`error uploading images => ${error}`));
      console.error(error);
    }
  };
};

// --------------------> User Avatar ImgUrl upload to cloudinary

export const startSavingUserAvatarImgUrl = (files) => {
  //! getState is a function the help us get all the info state from our store.
  return async (dispatch, getState) => {
    //this is the user id
    const { uuid: uid } = getState().auth;

    try {
      const { asset_id, original_filename, secure_url } = await fileUpload(
        files[0]
      );

      if (secure_url) {
        const urlRef = collection(FirebaseDB, `${uid}`);

        await setDoc(doc(urlRef, "userUrlAvatar"), {
          asset_id,
          original_filename,
          secure_url,
        });

        dispatch(setAvatarUserUrl(secure_url));

        dispatch(setSaving("user avatar img url successfully saved"));
      }
    } catch (error) {
      console.error(error);
    }
  };
};

// --------------------> get info from firebase and then start Loading All UserData
export const startLoadingUserAvatarImageUrl = () => {
  return async (dispatch, getState) => {
    const { uuid: uid, email } = getState().auth; // retrieve the user id and email from the state

    try {
      const docRef = doc(FirebaseDB, `${uid}`, "userUrlAvatar");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        dispatch(setAvatarUserUrl(docSnap.data().secure_url));
      }
    } catch (error) {
      console.error(error);
    }
  };
};
