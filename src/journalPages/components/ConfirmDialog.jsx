import { forwardRef } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material/";
import { useSelector } from "react-redux";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export const ConfirmDialog = ({
  open,
  setOpen,
  action,
  actionMessage = "",
}) => {
  const { displayName } = useSelector((state) => state.auth);
  const { activeNote } = useSelector((state) => state.journal);

  const deleteHeaderMessage = activeNote?.title;
  const logoutHeaderMessage = "Logging out?";

  const deleteBodyMessage = `are you sure you want to delete this part of your JOURNEY?...`;
  const logoutBodyMessage = "are you sure you want to LogOut?";

  const titleBody =
    actionMessage === "logout" ? logoutBodyMessage : deleteBodyMessage;
  const titleHeader =
    actionMessage === "logout" ? logoutHeaderMessage : deleteHeaderMessage;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle> {titleHeader} </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <b>{displayName}</b> {titleBody}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={action}>Agree</Button>
          <Button onClick={handleClose}>Disagree</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
