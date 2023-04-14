import { Box, ImageList, ImageListItem } from "@mui/material/";

export const ImageGallery = ({ urls }) => {
  return (
    <Box sx={{ width: "100%", overflowY: "scroll" }}>
      <ImageList variant="masonry" cols={3} gap={8}>
        {urls?.map((data) => (
          <ImageListItem key={data?.asset_id}>
            <img
              src={`${data?.secure_url}?w=248&fit=crop&auto=format`}
              srcSet={`${data?.secure_url}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={data?.original_filename}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};
