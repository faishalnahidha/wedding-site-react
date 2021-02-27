import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
  inputForm: {
    marginBottom: theme.spacing(3),
  },
  dialogAction: {
    padding: '16px 24px',
  },
  mobileButtonGroup: {
    marginTop: theme.spacing(3),
  },
  button: {
    marginBottom: theme.spacing(2),
  },
}));

export default function AddInvitationDialog(props) {
  const { open, handleSnackbarAdd, handleClose } = props;

  const classes = useStyles();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('xs'));

  const [recipientId, setRecipientId] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [isRecipientIdEmpty, setIsRecipientIdEmpty] = useState(false);
  const [isRecipientNameEmpty, setIsRecipientNameEmpty] = useState(false);

  const handleIdChange = (event) => {
    const { value } = event.target;
    setRecipientId(value);
    setIsRecipientIdEmpty(false);
  };

  const handleNameChange = (event) => {
    const { value } = event.target;
    setRecipientName(value);
    setIsRecipientNameEmpty(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const recId = recipientId.trim().toLowerCase();
    const recName = recipientName.trim();

    if (recName === '') {
      setIsRecipientNameEmpty(true);
    }

    if (recId === '') {
      setIsRecipientIdEmpty(true);
    }

    if (recId !== '' && recName !== '') {
      Meteor.call('recipients.insert', recId, recName);

      setRecipientId('');
      setRecipientName('');

      handleSnackbarAdd();
      handleClose();
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
        fullScreen={isMobile}
      >
        <DialogTitle>Tambah Undangan</DialogTitle>
        <DialogContent>
          <TextField
            id="recipientName"
            type="text"
            value={recipientName}
            onChange={handleNameChange}
            label="Nama Penerima"
            placeholder="contoh: Lisa Mayer"
            variant="outlined"
            fullWidth
            required
            autoFocus
            color="primary"
            className={classes.inputForm}
            error={isRecipientNameEmpty}
            helperText={isRecipientNameEmpty ? 'Wajib diisi!' : ''}
          />
          <TextField
            id="recipientId"
            type="text"
            value={recipientId}
            onChange={handleIdChange}
            label="ID Undangan"
            placeholder="contoh: lisa-mayer"
            variant="outlined"
            fullWidth
            required
            color="primary"
            error={isRecipientIdEmpty}
            helperText={isRecipientIdEmpty ? 'Wajib diisi!' : 'Tidak boleh ada spasi'}
          />
          {isMobile ? (
            <div className={classes.mobileButtonGroup}>
              <Button
                onClick={handleSubmit}
                color="primary"
                variant="contained"
                size="large"
                disableElevation
                fullWidth
                className={classes.button}
              >
                Tambah
              </Button>
              <Button onClick={handleClose} color="primary" size="large" fullWidth>
                Batal
              </Button>
            </div>
          ) : null}
        </DialogContent>
        {!isMobile ? (
          <DialogActions className={classes.dialogAction}>
            <Button onClick={handleClose} color="primary">
              Batal
            </Button>
            <Button onClick={handleSubmit} color="primary" variant="contained" disableElevation>
              Tambah
            </Button>
          </DialogActions>
        ) : null}
      </Dialog>
    </div>
  );
}

AddInvitationDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  handleSnackbarAdd: PropTypes.func,
};
