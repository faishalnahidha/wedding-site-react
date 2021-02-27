import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

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
