import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';

import { styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Slide from '@mui/material/Slide';

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const StyledDialog = styled(Dialog)({
  '& .MuiDialogContent-root': {
    padding: '16px 24px',
  },
  '& .MuiDialogActions-root': {
    padding: '16px 24px',
  },
});

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function AddInvitationDialog(props) {
  const { open, handleSnackbarAdd, handleClose } = props;

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

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
    <StyledDialog
      open={open}
      onClose={handleClose}
      aria-labelledby="add-invitation-dialog"
      fullWidth
      fullScreen={isMobile}
      TransitionComponent={Transition}
      sx={{
        mt: {
          xs: 7,
          sm: 'auto',
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h6">Tambah Undangan</Typography>
        <IconButton
          onClick={handleClose}
          size="large"
          sx={{
            position: 'absolute',
            right: 8,
            top: 4,
            color: 'grey.500',
          }}
        >
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
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
          sx={{ mb: 3 }}
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
          <div style={{ marginTop: '24px' }}>
            <Button
              onClick={handleSubmit}
              color="primary"
              variant="contained"
              size="large"
              disableElevation
              fullWidth
              sx={{ mb: 2 }}
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
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Batal
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained" disableElevation>
            Tambah
          </Button>
        </DialogActions>
      ) : null}
    </StyledDialog>
  );
}

AddInvitationDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSnackbarAdd: PropTypes.func,
};
