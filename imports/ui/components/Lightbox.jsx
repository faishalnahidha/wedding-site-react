import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';

const useStyles = makeStyles({
  dialog: {
    maxHeight: '90vh',
  },
  image: {
    display: 'block',
    width: '100%',
  },
});

export default function Lightbox(props) {
  const { open, imagePath, imageTitle, handleClose } = props;
  const classes = useStyles();

  return (
    <Dialog
      aria-labelledby="lightbox"
      maxWidth="md"
      scroll="body"
      open={open}
      onClose={handleClose}
      BackdropProps={{ style: { backgroundColor: 'rgba(0,0,0,0.67)' } }}
    >
      <img src={imagePath} alt={imageTitle || 'Photo'} className={classes.image} />
    </Dialog>
  );
}

Lightbox.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  imagePath: PropTypes.string.isRequired,
  imageTitle: PropTypes.string,
};
