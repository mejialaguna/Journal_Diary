import { useDispatch } from "react-redux";

import { Fab } from "@mui/material";
import { ToolTip } from "./ToolTip";

import AddPhotoIcon from "@mui/icons-material/AddAPhoto";
import { startUploadingFiles } from "../../store";

export const AddNewImage = () => {
  const dispatch = useDispatch();

  const onFileChange = async ({ target }) => {
    if (target.files === 0) return;
    // console.log(target.files);

    dispatch(startUploadingFiles(target.files));
  };

  return (
    <ToolTip title="Add a new Image" placement="right">
      <Fab
        color="primary"
        aria-label="add-image"
        sx={{ position: "fixed", bottom: 60, left: 300, overflow: "hidden" }}
      >
        <input
          type="file"
          onChange={onFileChange}
          accept=" image/* ,.jpg, .jpeg, .png"
          multiple
          style={{
            position: "absolute",
            top: "-35px",
            left: 0,
            height: "calc(100% + 36px)",
            width: "calc(100% + 5px)",
            outline: "none",
          }}
        />

        <AddPhotoIcon />
      </Fab>
    </ToolTip>
  );
};
