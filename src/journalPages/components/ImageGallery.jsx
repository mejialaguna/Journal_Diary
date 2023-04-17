import { useState } from "react";
import { Box, ImageList, ImageListItem } from "@mui/material";
import { PopoverComp } from "./PopoverComp";

export const ImageGallery = ({ urls }) => {
  const [anchorElement, setAnchorElement] = useState(null);
  const [name, setName] = useState(null);

  const handleClick = (event) => {
    setAnchorElement(event?.currentTarget);
    setName(event.target.alt);
  };
  const handleClose = () => {
    setAnchorElement(null);
  };

  const open = Boolean(anchorElement);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Box sx={{ width: "100%", height: "100%", overflowY: "scroll" }}>
        <ImageList variant="masonry" cols={5} gap={15}>
          {urls?.map((data) => (
            <ImageListItem key={data.asset_id}>
              <img
                style={{ borderRadius: 20 }}
                onClick={handleClick}
                src={`${data?.secure_url}?w=248&fit=crop&auto=format`}
                srcSet={`${data?.secure_url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={data?.original_filename}
                loading="lazy"
                aria-describedby={id}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
      <PopoverComp
        anchorElement={anchorElement}
        name={name}
        open={open}
        id={id}
        handleClose={handleClose}
      />
    </>
  );
};
