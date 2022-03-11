import React, { useState } from 'react';

import makeStyles from '@mui/styles/makeStyles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ButtonBase from '@mui/material/ButtonBase';

import Lightbox from '../../components/Lightbox.jsx';
import GalleryIcon from '../../components/icons/GalleryIcon.jsx';

import { galleryData, youtubeSrc } from '../../../lib/variables.js';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(6),
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    width: '100%',
  },
  image: {
    // unresolved!
    '&:hover': {
      zIndex: 1,
      backgroundColor: '#fff',
    },
  },
  icon: {
    width: '40px',
    height: '40px',
  },
  videoResponsive: {
    position: 'relative',
    height: 0,
    overflow: 'hidden',
    paddingBottom: '56.25%',
    marginRight: 8,
    marginBottom: 8,
  },
  iframe: {
    left: 0,
    top: 0,
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
}));

export default function GallerySection() {
  const classes = useStyles();
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
      <div className={classes.root}>
        <Container maxWidth="xs" disableGutters>
          <Box pb={6} textAlign="center">
            <GalleryIcon className={classes.icon} />
          </Box>
          <div className={classes.videoResponsive}>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${youtubeSrc}?&autoplay=1`}
              title="Pre-wedding Video Youtube"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className={classes.iframe}
            />
          </div>
          <ImageList rowHeight={180} cols={2} gap={8} className={classes.imageList}>
            {galleryData.map((item) => (
              <ImageListItem
                component={ButtonBase}
                key={item.img}
                cols={item.cols || 1}
                onClick={() => handleOpenLightbox(item)}
              >
                <img src={item.thumbnail} alt={item.title} />
              </ImageListItem>
            ))}
          </ImageList>
        </Container>
      </div>
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
