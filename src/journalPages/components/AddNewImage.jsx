import { useDispatch } from "react-redux";

import { Fab } from "@mui/material";
import { ToolTip } from "./";

import AddPhotoIcon from "@mui/icons-material/AddAPhoto";

export const AddNewImage = ({ children }) => {
  const dispatch = useDispatch();

  return (
    <ToolTip title="Add a new Image" placement="right">
      <Fab
        color="primary"
        aria-label="add-image"
        sx={{
          position: "fixed",
          bottom: 60,
          left: 300,
          overflow: "hidden",
          opacity: 0.5,
          ":hover": { backgroundColor: "primary.main", opacity: 1 },
          animation: "ease-in-out",
          transition: "500ms",
        }}
      >
        {children}

        <AddPhotoIcon />
      </Fab>
    </ToolTip>
  );
};
