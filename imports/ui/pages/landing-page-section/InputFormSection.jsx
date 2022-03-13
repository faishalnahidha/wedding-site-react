import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';

import { AttentionSeeker } from 'react-awesome-reveal';

const rsvpOptions = [
  {
    value: '',
  },
  {
    value: 'Yes',
    text: 'Siap! Saya pasti akan hadir',
  },
  {
    value: 'Maybe',
    text: 'OK, kalau sempat saya akan hadir',
  },
  {
    value: 'No',
    text: 'Maaf tidak bisa hadir, saya doakan saja semoga lancar',
  },
];

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function InputFormSection(props) {
  const [rsvpInput, setRsvpInput] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const { recipient } = props;

  const handleRsvpChange = (event) => {
    setRsvpInput(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessageInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const message = messageInput !== undefined ? messageInput : '';

    Meteor.call('recipients.updateRsvp', recipient._id, rsvpInput, message);

    setOpenSnackbar(true);
  };

  return (
    <>
      <Container
        maxWidth="xs"
        sx={{
          pt: 1,
          pb: 5,
          px: 3,
          flexGrow: 1,
          bgcolor: 'background.paper',
        }}
      >
        <Divider sx={{ width: '100%', mb: 6 }} />
        <Box width="38%" mx="auto" mb={6}>
          <AttentionSeeker effect="pulse" delay={1000}>
            <img
              src="/img/logo-gradient.svg"
              alt="Wedding Logo Gradient"
              style={{ width: '100%' }}
            />
          </AttentionSeeker>
        </Box>
        {recipient._id !== '0' ? (
          <>
            <Box width="100%" mb={2}>
              <Typography variant="body1" color="textSecondary" paragraph>
                Kami sangat berbahagia jika Saudara/i bersedia menghadiri acara resepsi pernikahan
                kami
              </Typography>
            </Box>
            <Box width="100%">
              {/* #################### Form Group #################### */}
              <form onSubmit={handleSubmit}>
                <TextField
                  id="rsvpInput"
                  value={rsvpInput}
                  onChange={handleRsvpChange}
                  label="Konfirmasi kedatangan"
                  variant="outlined"
                  color="primary"
                  select
                  SelectProps={{
                    native: true,
                  }}
                  fullWidth
                  required
                  sx={{ mb: 2 }}
                >
                  {rsvpOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.text}
                    </option>
                  ))}
                </TextField>

                <TextField
                  id="messageInput"
                  type="text"
                  value={messageInput}
                  onChange={handleMessageChange}
                  label="Pesan untuk pengantin"
                  variant="outlined"
                  color="primary"
                  multiline
                  rows="3"
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <Button
                  type="submit"
                  value="Submit"
                  variant="contained"
                  color="primary"
                  disableElevation
                  sx={{ width: '120px' }}
                >
                  Kirim
                </Button>
              </form>
            </Box>
          </>
        ) : null}
      </Container>
      {/* #################### Snackbar #################### */}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          Pesan sudah diterima. Terima kasih!
        </Alert>
      </Snackbar>
    </>
  );
}

InputFormSection.propTypes = {
  recipient: PropTypes.object,
};
