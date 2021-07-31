import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ButtonBase from '@material-ui/core/ButtonBase';

import Lightbox from '../../components/Lightbox.jsx';
import GalleryIcon from '../../components/icons/GalleryIcon.jsx';

import { galleryData } from '../../../lib/variables.js';

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
          <ImageList cellHeight={180} cols={2} className={classes.imageList}>
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
