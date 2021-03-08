import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ButtonBase from '@material-ui/core/ButtonBase';

import Lightbox from '../../components/Lightbox.jsx';

import { galleryData } from '../../../api/variables.js';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(6),
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
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
  },
}));

export default function GallerySection() {
  const classes = useStyles();
  const [openLightbox, setOpenLightbox] = useState(false);
  const [clickedTile, setClickedTile] = useState(null);

  const handleOpenLightbox = (tile) => {
    setClickedTile(tile);
    setOpenLightbox(true);
  };

  const handleCloseLightbox = () => {
    setOpenLightbox(false);
  };

  return (
    <>
      <div className={classes.root}>
        <Container maxWidth="xs">
          <Box marginBottom={6} textAlign="center">
            <img src="/img/icon-gallery.svg" alt="Altar Icon" className={classes.icon} />
          </Box>
          <GridList cellHeight={180} cols={2} className={classes.gridList}>
            {galleryData.map((tile) => (
              <GridListTile
                component={ButtonBase}
                key={tile.img}
                cols={tile.cols || 1}
                onClick={() => handleOpenLightbox(tile)}
              >
                <img src={tile.thumbnail} alt={tile.title} />
              </GridListTile>
            ))}
          </GridList>
        </Container>
      </div>
      {clickedTile && (
        <Lightbox
          open={openLightbox}
          imagePath={clickedTile.img}
          imageTitle={clickedTile.title}
          handleClose={handleCloseLightbox}
        />
      )}
    </>
  );
}
