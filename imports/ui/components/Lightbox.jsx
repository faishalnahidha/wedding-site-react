import React from 'react';
import PropTypes from 'prop-types';

import Dialog from '@mui/material/Dialog';

export default function Lightbox(props) {
  const { open, imagePath, imageTitle, handleClose } = props;

  return (
    <Dialog
      aria-labelledby="lightbox"
      fullWidth
      maxWidth="md"
      scroll="body"
      open={open}
      onClose={handleClose}
      BackdropProps={{ style: { backgroundColor: 'rgba(0,0,0,0.67)' } }}
    >
      <img
        src={imagePath}
        alt={imageTitle || 'Photo'}
        style={{ display: 'block', width: '100%' }}
      />
    </Dialog>
  );
}

Lightbox.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  imagePath: PropTypes.string.isRequired,
  imageTitle: PropTypes.string,
};
