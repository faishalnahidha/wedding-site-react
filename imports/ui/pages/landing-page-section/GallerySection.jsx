import React, { useState } from 'react';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ButtonBase from '@mui/material/ButtonBase';

import Lightbox from '../../components/Lightbox.jsx';
import GalleryIcon from '../../components/icons/GalleryIcon.jsx';

import { galleryData, youtubeSrc } from '../../../lib/variables.js';

export default function GallerySection() {
  const [openLightbox, setOpenLightbox] = useState(false);
  const [clickedItem, setClickedItem] = useState(null);

  const handleOpenLightbox = (item) => {
    setClickedItem(item);
    setOpenLightbox(true);
  };

  const handleCloseLightbox = () => {
    setOpenLightbox(false);
  };

  return (
    <>
      <Container
        maxWidth="xs"
        disableGutters
        sx={{
          paddingTop: 1,
          paddingBottom: 7,
          flexGrow: 1,
          bgcolor: 'background.paper',
        }}
      >
        <Box pb={6} textAlign="center">
          <GalleryIcon style={{ width: '40px', height: '40px' }} />
        </Box>
        <Box position="relative" height={0} overflow="hidden" paddingBottom="56.25%">
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${youtubeSrc}?&autoplay=1`}
            title="Pre-wedding Video Youtube"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ left: 0, top: 0, height: '100%', width: '100%', position: 'absolute' }}
          />
        </Box>
        <ImageList rowHeight={180} cols={2} gap={8} variant="quilted" sx={{ mt: 1, mb: 0 }}>
          {galleryData.map((item) => (
            <ImageListItem
              component={ButtonBase}
              key={item.img}
              cols={item.cols || 1}
              rows={1}
              onClick={() => handleOpenLightbox(item)}
            >
              <img src={item.thumbnail} alt={item.title} />
            </ImageListItem>
          ))}
        </ImageList>
      </Container>

      {clickedItem && (
        <Lightbox
          open={openLightbox}
          imagePath={clickedItem.img}
          imageTitle={clickedItem.title}
          handleClose={handleCloseLightbox}
        />
      )}
    </>
  );
}
