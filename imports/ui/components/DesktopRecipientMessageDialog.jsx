import React from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';

export default function DesktopRecipientMessageDialog(props) {
  const { open, handleClose, recipientName, recipientMessage } = props;

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="desktop-recipient-message-dialog"
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Pesan dari {recipientName}</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>{recipientMessage || 'Belum ada pesan'}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Tutup
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

DesktopRecipientMessageDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  recipientName: PropTypes.string.isRequired,
  recipientMessage: PropTypes.string,
};
